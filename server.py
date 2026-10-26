#!/usr/bin/env python3
"""
Custom high-performance HTTP server for the Scroll Animation web application.
Supports:
- Clean MIME types for .jpg, .js, .css, .html, .svg
- Byte range requests (for video/assets)
- CORS headers
- Proper caching headers for smooth 60fps frame scrubbing
"""

import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Range')
        
        # Cache image frames for instant scroll rendering
        if self.path.endswith(('.jpg', '.png', '.webp', '.woff2', '.ttf')):
            self.send_header('Cache-Control', 'public, max-age=86400, immutable')
        elif self.path.endswith(('.css', '.js')):
            self.send_header('Cache-Control', 'no-cache')
        else:
            self.send_header('Cache-Control', 'no-cache')
            
        super().end_headers()

    def log_message(self, format, *args):
        # Suppress spamming terminal with 237 image requests per scroll
        if any(args[0].startswith(code) for code in ['200', '304', '206']) and 'ezgif-frame-' in str(args):
            return
        super().log_message(format, *args)

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    with ReusableTCPServer(("", port), Handler) as httpd:
        print(f"🎬 Prime Fresh Scroll Animation Server running at: http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

