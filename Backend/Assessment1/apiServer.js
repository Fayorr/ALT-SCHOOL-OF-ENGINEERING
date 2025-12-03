const http = require('http');
const url = require('url');
const inventoryService = require('./services/inventoryService');

const PORT = 4000;

const server = http.createServer(async (req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const pathname = parsedUrl.pathname;
	const method = req.method;

	// Set CORS headers
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// Handle preflight requests
	if (method === 'OPTIONS') {
		res.writeHead(200);
		res.end();
		return;
	}

	try {
		// Route: GET /items - Get all items
		if (pathname === '/items' && method === 'GET') {
			const items = await inventoryService.getAllItems();
			sendResponse(res, 200, {
				success: true,
				data: items,
				message: 'Items retrieved successfully',
			});
		}
		// Route: GET /items/:id - Get one item
		else if (pathname.match(/^\/items\/[\w-]+$/) && method === 'GET') {
			const id = pathname.split('/')[2];
			const item = await inventoryService.getItemById(id);

			if (item) {
				sendResponse(res, 200, {
					success: true,
					data: item,
					message: 'Item retrieved successfully',
				});
			} else {
				sendResponse(res, 404, {
					success: false,
					data: null,
					message: 'Item not found',
				});
			}
		}
		// Route: POST /items - Create item
		else if (pathname === '/items' && method === 'POST') {
			const body = await getRequestBody(req);
			const newItem = await inventoryService.createItem(body);

			sendResponse(res, 201, {
				success: true,
				data: newItem,
				message: 'Item created successfully',
			});
		}
		// Route: PUT /items/:id - Update item
		else if (pathname.match(/^\/items\/[\w-]+$/) && method === 'PUT') {
			const id = pathname.split('/')[2];
			const body = await getRequestBody(req);
			const updatedItem = await inventoryService.updateItem(id, body);

			if (updatedItem) {
				sendResponse(res, 200, {
					success: true,
					data: updatedItem,
					message: 'Item updated successfully',
				});
			} else {
				sendResponse(res, 404, {
					success: false,
					data: null,
					message: 'Item not found',
				});
			}
		}
		// Route: DELETE /items/:id - Delete item
		else if (pathname.match(/^\/items\/[\w-]+$/) && method === 'DELETE') {
			const id = pathname.split('/')[2];
			const deleted = await inventoryService.deleteItem(id);

			if (deleted) {
				sendResponse(res, 200, {
					success: true,
					data: null,
					message: 'Item deleted successfully',
				});
			} else {
				sendResponse(res, 404, {
					success: false,
					data: null,
					message: 'Item not found',
				});
			}
		}
		// Route not found
		else {
			sendResponse(res, 404, {
				success: false,
				data: null,
				message: 'Route not found',
			});
		}
	} catch (error) {
		console.error('Error:', error);
		sendResponse(res, 400, {
			success: false,
			data: null,
			message: error.message || 'An error occurred',
		});
	}
});

function getRequestBody(req) {
	return new Promise((resolve, reject) => {
		let body = '';

		req.on('data', (chunk) => {
			body += chunk.toString();
		});

		req.on('end', () => {
			try {
				resolve(body ? JSON.parse(body) : {});
			} catch (error) {
				reject(new Error('Invalid JSON'));
			}
		});

		req.on('error', (error) => {
			reject(error);
		});
	});
}

function sendResponse(res, statusCode, data) {
	res.writeHead(statusCode);
	res.end(JSON.stringify(data));
}

server.listen(PORT, () => {
	console.log(`API server running at http://localhost:${PORT}/`);
	console.log('Available endpoints:');
	console.log('  GET    /items      - Get all items');
	console.log('  GET    /items/:id  - Get one item');
	console.log('  POST   /items      - Create item');
	console.log('  PUT    /items/:id  - Update item');
	console.log('  DELETE /items/:id  - Delete item');
});
