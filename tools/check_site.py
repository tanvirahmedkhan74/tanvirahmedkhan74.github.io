"""Dependency-free checks for the public static site. Run from any directory."""
import json
import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://tanvirahmedkhan74.github.io'
PAGES = [ROOT/'index.html', ROOT/'404.html', ROOT/'cv/index.html',
         *sorted((ROOT/'notes').rglob('index.html')), *sorted((ROOT/'research').rglob('index.html'))]
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.links, self.refs = path, [], [], []
        self.stack, self.errors, self.headings, self.metas = [], [], [], {}
        self.canonical, self.main_count, self.title_count = None, 0, 0
        self.feed(path.read_text(encoding='utf-8'))
        if self.stack:
            self.errors.append(f'Unclosed elements: {self.stack}')

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in VOID:
            self.stack.append(tag)
        if 'id' in a:
            self.ids.append(a['id'])
        for field in ('aria-labelledby', 'aria-describedby', 'aria-controls'):
            self.refs.extend(a.get(field, '').split())
        for field in ('href', 'src'):
            if a.get(field):
                self.links.append(a[field])
        for source in a.get('srcset', '').split(','):
            if source.strip():
                self.links.append(source.strip().split()[0])
        if re.fullmatch('h[1-6]', tag):
            self.headings.append(int(tag[1]))
        if tag == 'main': self.main_count += 1
        if tag == 'title': self.title_count += 1
        if tag == 'img' and ('alt' not in a or 'width' not in a or 'height' not in a):
            self.errors.append('Image lacks alt text or intrinsic dimensions')
        if tag == 'html' and a.get('lang') != 'en':
            self.errors.append('Missing English document language')
        if tag == 'meta': self.metas[a.get('name', a.get('property', ''))] = a.get('content')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        if tag == 'th' and a.get('scope') != 'col': self.errors.append('Column header lacks scope')
        if tag == 'script' and a.get('src'): self.errors.append('Unexpected client-side script')

    def handle_endtag(self, tag):
        if tag in VOID: return
        if not self.stack or self.stack[-1] != tag:
            self.errors.append(f'Misnested closing tag: {tag}')
        else:
            self.stack.pop()


def route(path):
    rel = path.relative_to(ROOT).as_posix()
    return '/' + rel.removesuffix('index.html') if rel.endswith('index.html') else '/' + rel


def main():
    pages = {path: Page(path) for path in PAGES}
    errors, checked = [], 0
    for path, page in pages.items():
        label = path.relative_to(ROOT).as_posix()
        errors.extend(f'{label}: {e}' for e in page.errors)
        duplicates = [i for i,n in Counter(page.ids).items() if n > 1]
        if duplicates: errors.append(f'{label}: Duplicate IDs {duplicates}')
        for ref in page.refs:
            if ref not in page.ids: errors.append(f'{label}: Missing ARIA target {ref}')
        if page.main_count != 1 or page.title_count != 1 or page.headings.count(1) != 1:
            errors.append(f'{label}: Expected one main, title, and h1')
        for prev, current in zip(page.headings,page.headings[1:]):
            if current > prev + 1: errors.append(f'{label}: Heading level jumps from {prev} to {current}')
        if not page.metas.get('viewport'): errors.append(f'{label}: Missing viewport')
        if path.name != '404.html':
            if page.canonical != ORIGIN + route(path): errors.append(f'{label}: Wrong canonical')
            for meta in ('description', 'og:title', 'og:description', 'og:url', 'og:image'):
                if not page.metas.get(meta): errors.append(f'{label}: Missing {meta}')
        elif page.metas.get('robots') != 'noindex': errors.append('404 must be noindex')
        text = path.read_text(encoding='utf-8')
        for data in re.findall(r'<script type="application/ld\+json">(.*?)</script>',text,re.S):
            try: json.loads(data)
            except ValueError: errors.append(f'{label}: Invalid JSON-LD')
        for link in page.links:
            if urlsplit(link).scheme in ('mailto','tel'): continue
            absolute = urlsplit(urljoin(ORIGIN + route(path),link))
            if absolute.netloc != urlsplit(ORIGIN).netloc: continue
            dest = ROOT / unquote(absolute.path).lstrip('/')
            if dest.is_dir(): dest /= 'index.html'
            checked += 1
            if not dest.is_file(): errors.append(f'{label}: Missing local target {link}')
            elif absolute.fragment and dest in pages and unquote(absolute.fragment) not in pages[dest].ids:
                errors.append(f'{label}: Missing fragment {link}')
            elif dest.suffix == '.html' and dest not in pages:
                errors.append(f'{label}: Link outside public HTML routes: {link}')
    sitemap = ElementTree.parse(ROOT/'sitemap.xml')
    urls = {node.text for node in sitemap.findall('.//{*}loc')}
    expected = {ORIGIN + route(p) for p in PAGES if p.name != '404.html'}
    if urls != expected: errors.append(f'Sitemap route mismatch: {urls ^ expected}')
    if errors:
        print('\n'.join(errors))
        return 1
    print(f'PASS: {len(pages)} pages; {checked} local links/assets/fragments; headings, nesting, metadata, ARIA, JSON-LD, and sitemap.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
