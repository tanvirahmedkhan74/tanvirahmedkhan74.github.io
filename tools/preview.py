"""Serve only the public portfolio, using the same files as GitHub Pages."""
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / 'index.html', ROOT / '404.html', ROOT / 'cv/index.html',
         ROOT / 'notes/index.html', *sorted((ROOT / 'research').rglob('index.html'))]


class PortfolioHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        route = unquote(urlsplit(self.path).path)
        target = (ROOT / route.lstrip('/')).resolve()
        if target.is_dir():
            target /= 'index.html'
        public_assets = ROOT / 'assets/public'
        allowed = target in PAGES or target in [ROOT / name for name in (
            'robots.txt', 'sitemap.xml', 'favicon.svg', 'favicon-32.png',
            'favicon-512.png', 'apple-touch-icon.png')]
        allowed = allowed or (target.is_relative_to(public_assets) and target.is_file())
        if allowed and target.is_file():
            return super().send_head()
        error = (ROOT / '404.html').read_bytes()
        self.send_response(404)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(error)))
        self.end_headers()
        if self.command != 'HEAD':
            self.wfile.write(error)
        return None


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8080)
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', args.port), PortfolioHandler)
    print(f'Portfolio preview: http://127.0.0.1:{args.port}/', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
