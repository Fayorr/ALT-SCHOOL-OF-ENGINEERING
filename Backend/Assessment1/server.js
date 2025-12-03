const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
	// Only handle GET requests
	if (req.method !== 'GET') {
		res.writeHead(405, { 'Content-Type': 'text/plain' });
		res.end('Method Not Allowed');
		return;
	}

	// Handle root path
	if (req.url === '/') {
		req.url = '/index.html';
	}

	// Only serve .html files
	if (!req.url.endsWith('.html')) {
		serve404(res);
		return;
	}

	const filePath = path.join(__dirname, 'public', req.url);

	// Read and serve the file
	fs.readFile(filePath, 'utf8', (err, content) => {
		if (err) {
			if (err.code === 'ENOENT') {
				serve404(res);
			} else {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal Server Error');
			}
			return;
		}

		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(content);
	});
});

function serve404(res) {
	const notFoundPath = path.join(__dirname, 'public', '404.html');

	fs.readFile(notFoundPath, 'utf8', (err, content) => {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('404 - Page Not Found');
			return;
		}

		res.writeHead(404, { 'Content-Type': 'text/html' });
		res.end(content);
	});
}

server.listen(PORT, () => {
	console.log(`Web server running at http://localhost:${PORT}/`);
	console.log(
		`Visit http://localhost:${PORT}/index.html to see the student page`
	);
});
