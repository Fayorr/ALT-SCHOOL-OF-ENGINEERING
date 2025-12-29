//use inventory_management_system;

// CREATE COLLECTIONS
db.createCollection("categories");
db.createCollection("users");
db.createCollection("items");
db.createCollection("orders");

// INSERT CATEGORIES WITH MANUAL IDS
db.categories.insertMany([
  { _id: 101, name: "toothpaste", description: "for fresh breath" },
  { _id: 102, name: "soap", description: "for clean clothes" }
]);

// INSERT USERS WITH MANUAL IDS
db.users.insertMany([
  { _id: 201, name: "Fayokunmi", role: "admin", email: "fayo@gmail.com" },
  { _id: 202, name: "Osho", role: "user", email: "osho@gmail.com" }
]);

// INSERT ITEMS WITH MANUAL IDS
db.items.insertMany([
  {
    _id: 301,
    name: "Maclean",
    price: 120,
    size: "large",
    stock_quantity: 200,
    category_id: 101
  },
  {
    _id: 302,
    name: "Siri Soap",
    price: 50,
    size: "small",
    stock_quantity: 100,
    category_id: 102
  }
]);

// INSERT ORDERS USING MANUAL IDS
db.orders.insertOne({
  _id: 401,
  user_id: 202,
  total_price: 600,
  admin_verdict: "pending",
  admin_id: null,
  items: [
    {
      item_id: 301,
      price_at_order_time: 120,
      quantity: 5
    }
  ],
  createdAt: new Date()
});

db.orders.insertOne({
  _id: 402,
  user_id: 202,
  total_price: 250,
  admin_verdict: "pending",
  admin_id: null,
  items: [
    {
      item_id: 302,
      price_at_order_time: 50,
      quantity: 5
    }
  ],
  createdAt: new Date()
});

db.orders.insertOne({
  _id: 403,
  user_id: 202,
  total_price: 0,
  admin_verdict: "approved",
  admin_id: 201,
  items: [],
  createdAt: new Date()
});

// GET RECORDS (MULTIPLE ENTITIES)
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "customer_info"
    }
  }
]);

// UPDATE RECORDS
db.orders.updateOne(
  { _id: 401 },
  { $set: { admin_verdict: "approved", admin_id: 201 } }
);

db.items.updateOne(
  { _id: 302 },
  { $inc: { stock_quantity: -5 } }
);

// DELETE RECORDS FROM MULTIPLE ENTITIES
db.orders.deleteOne({ _id: 403 })

db.items.deleteMany({ category_id: 102 });

// LOOKUP QUERIES (MULTI-ENTITY)
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "customer_info"
    }
  }
]);

db.items.aggregate([
  {
    $lookup: {
      from: "categories",
      localField: "category_id",
      foreignField: "_id",
      as: "category_details"
    }
  }
]);
