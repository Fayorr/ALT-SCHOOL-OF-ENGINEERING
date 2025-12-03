const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(
	__dirname,
	'..',
	'Assessment1',
	'data',
	'items.json'
);

// Generate simple UUID
function generateId() {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Validate item data
function validateItem(data, isUpdate = false) {
	const errors = [];

	if (!isUpdate && !data.name) {
		errors.push('Name is required');
	}
	if (!isUpdate && data.price === undefined) {
		errors.push('Price is required');
	}
	if (!isUpdate && !data.size) {
		errors.push('Size is required');
	}

	if (data.price !== undefined) {
		const price = parseFloat(data.price);
		if (isNaN(price) || price < 0) {
			errors.push('Price must be a positive number');
		}
	}

	if (
		data.size &&
		!['s', 'm', 'l', 'small', 'medium', 'large'].includes(
			data.size.toLowerCase()
		)
	) {
		errors.push('Size must be s/small, m/medium, or l/large');
	}

	if (errors.length > 0) {
		throw new Error(errors.join(', '));
	}
}

// Normalize size to single letter
function normalizeSize(size) {
	const sizeMap = { small: 's', medium: 'm', large: 'l' };
	const lowerSize = size.toLowerCase();
	return sizeMap[lowerSize] || lowerSize;
}

// Read items from file
async function readItems() {
	try {
		const data = await fs.readFile(DATA_FILE, 'utf8');
		return JSON.parse(data);
	} catch (error) {
		if (error.code === 'ENOENT') {
			// File doesn't exist, return empty array
			return [];
		}
		throw error;
	}
}

// Write items to file
async function writeItems(items) {
	try {
		// Ensure directory exists
		await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
		await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2));
	} catch (error) {
		throw new Error('Failed to write to database');
	}
}

// Get all items
async function getAllItems() {
	return await readItems();
}

// Get item by ID
async function getItemById(id) {
	const items = await readItems();
	return items.find((item) => item.id === id) || null;
}

// Create new item
async function createItem(data) {
	validateItem(data);

	const items = await readItems();

	const newItem = {
		id: generateId(),
		name: data.name,
		price: parseFloat(data.price),
		size: normalizeSize(data.size),
	};

	items.push(newItem);
	await writeItems(items);

	return newItem;
}

// Update item
async function updateItem(id, data) {
	validateItem(data, true);

	const items = await readItems();
	const index = items.findIndex((item) => item.id === id);

	if (index === -1) {
		return null;
	}

	// Update only provided fields
	if (data.name !== undefined) {
		items[index].name = data.name;
	}
	if (data.price !== undefined) {
		items[index].price = parseFloat(data.price);
	}
	if (data.size !== undefined) {
		items[index].size = normalizeSize(data.size);
	}

	await writeItems(items);
	return items[index];
}

// Delete item
async function deleteItem(id) {
	const items = await readItems();
	const index = items.findIndex((item) => item.id === id);

	if (index === -1) {
		return false;
	}

	items.splice(index, 1);
	await writeItems(items);

	return true;
}

module.exports = {
	getAllItems,
	getItemById,
	createItem,
	updateItem,
	deleteItem,
};
