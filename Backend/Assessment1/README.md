# NodeJS Assignment

This workspace contains two simple servers implemented without frameworks:

- Web server (serves static HTML): `Assessment1/server.js` (port 3000)
- API server (inventory CRUD): `apiServer.js` (port 4000)

How to run

Open a terminal in the project root (`Backend`) and run the web server from the `Assessment1` folder and the API server from the project root:

```bash
# Start web server (serves index.html and 404.html)
cd Assessment1
npm run web

# In another terminal, start API server
cd /Users/mac/Desktop/WebDev\ Project/PROJECTS/ALT\ SCHOOL\ OF\ ENGINEERING/Backend
npm run --prefix Assessment1 api
```

Notes

- The inventory data file is stored at `Assessment1/data/items.json` and is used by the API service.
- API responses use a consistent JSON structure: `{ success: boolean, data: any, message: string }`.
- No frameworks are used; the servers use Node's built-in `http` and `fs` modules.

Endpoints (API)

- GET `/items` - Get all items
- GET `/items/:id` - Get a single item
- POST `/items` - Create an item
- PUT `/items/:id` - Update an item
- DELETE `/items/:id` - Delete an item

Item format

```json
{
	"id": "generated-id",
	"name": "item name",
	"price": 12.5,
	"size": "s" // one of 's','m','l'
}
```

If you want, I can run a quick manual test script or add a simple test harness to exercise the API endpoints.
