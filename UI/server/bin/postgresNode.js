const connectionString = require("./URI.js");
// 1) connect to DB
const {
  Pool
} = require('pg');

const pool = new Pool({
  connectionString:connectionString,
});

// create array of values to insert into database
// const woodValuesToInsert = [{
//   type: 'ash',
//   image: 'https://imgur.com/1aIZHue',
//   description: 'Tough hardwood imported from southeastern states',
//   price: 19.99,
//   inStock: true
// }, {
//   type: 'birch',
//   image: 'https://imgur.com/sQmjwrT',
//   description: 'Hard, heavy wood imported from northeastern states',
//   price: 25.99,
//   inStock: true
// }, {
//   type: 'cherry',
//   image: 'https://imgur.com/nfYqw34',
//   description: 'One of our premium wood imported from northeastern states',
//   price: 19.99,
//   inStock: true
// }, {
//   type: 'maple',
//   image: 'https://imgur.com/6mF8cnY',
//   description: 'Most popular and durable wood imported from southeastern states',
//   price: 29.99,
//   inStock: true
// }, {
//   type: 'pine',
//   image: 'https://imgur.com/hCoZu9C',
//   description: 'Imported from eastern states',
//   price: 15.99,
//   inStock: true
// }, {
//   type: 'redoak',
//   image: 'https://imgur.com/KACe4VK',
//   description: 'Top of the line, solid wood imported from western states',
//   price: 29.99,
//   inStock: true
// }];
// const stainValuesTOInsert = [{
//   type: 'Burgundy',
//   image: 'https://imgur.com/Ybv96C6',
//   description: 'Water-resistant and durable',
//   price: 19.99,
//   inStock: true
// }, {
//   type: 'Cherry-Blossom',
//   image: 'https://imgur.com/q3OvhO5',
//   description: 'economical and durable',
//   price: 15.99,
//   inStock: true
// }, {
//   type: 'Honeydew',
//   image: 'https://imgur.com/lWjpnzx',
//   description: 'Water-resistant and durable',
//   price: 19.99,
//   inStock: true
// }, {
//   type: 'Island-Water',
//   image: 'https://imgur.com/n50UxsO',
//   description: 'High quality, water-resistant and durable',
//   price: 25.99,
//   inStock: true
// }, {
//   type: 'Pure-white',
//   image: 'https://imgur.com/x1vj3JB',
//   description: 'Water-resistant and durable',
//   price: 20.99,
//   inStock: true
// }, {
//   type: 'Slate',
//   image: 'https://imgur.com/l8VkEXM',
//   description: 'High demand, high quality, water-resistant and durable',
//   price: 25.99,
//   inStock: true
// }];

// // DB insert queries
// const createWoodTable =
//   `CREATE TABLE IF NOT EXISTS wood("_id" serial PRIMARY KEY NOT NULL, "type" varchar(50) NOT NULL, "image" varchar, "description" varchar, "price" numeric(10,2) NOT NULL, "inStock" boolean)`;
// const stainTableInsertQuery =
//   `CREATE TABLE IF NOT EXISTS stain(
//   "_id" serial PRIMARY KEY NOT NULL,
//   "type" varchar(50) NOT NULL,
//   "image" varchar,
//   "description" varchar,
//   "price" numeric(10,2) NOT NULL,
//   "inStock" boolean)`;

//   const cartTableQuery =
//   `CREATE TABLE IF NOT EXISTS cart(
//   "_id" serial PRIMARY KEY NOT NULL,
//   "orderID" integer NOT NULL,
//   "customer" varchar,
//   "wood" varchar,
//   "stain" varchar(50) NOT NULL,
//   "email" varchar,
//   "total" numeric(10,2))`;


// function createWoodTableAndInsertValues() {
//   pool.query(createWoodTable, (err, res) => {
//     if (err) console.log(err);
//     pool.query('SELECT * FROM stain', (err, result) => {
//       if (result.rowCount < 6) {
//         const woodValues = [];
//         for (let i = 0; i < woodValuesToInsert.length; i++) {
//           woodValues.push(Object.values(woodValuesToInsert[i]));
//         }
//         woodValues.forEach(value => {
//           pool.query(`INSERT INTO wood ("type", "image", "description", "price", "inStock") VALUES ($1, $2, $3, $4, $5) RETURNING *;`, value, (err, res) => {
//             if (err) console.log(err);
//           });
//         });
//       }
//     });
//   });
// }

// function createStainTableAndInsertValues() {
//   pool.query(stainTableInsertQuery, (err, res) => {
//     if (err) console.log(err);
//     pool.query('SELECT * FROM stain', (err, result) => {
//       if (result.rowCount < 6) {
//         const stainValues = [];
//         for (let i = 0; i < stainValuesTOInsert.length; i++) {
//           stainValues.push(Object.values(stainValuesTOInsert[i]));
//         }
//         stainValues.forEach(value => {
//           pool.query(`INSERT INTO stain ("type", "image", "description", "price", "inStock") VALUES ($1, $2, $3, $4, $5) RETURNING *;`, value, (err, res) => {
//             if (err) console.log(err);
//           });
//         })
//       }
//     });
//   });
// }

// function createCartTable() {
//   pool.query(cartTableQuery, (err, res) => {
//     if (err) console.log(err);
//   });
// }

// createWoodTableAndInsertValues();
// createStainTableAndInsertValues();
// createCartTable();

module.exports = pool;