import express from "express";
import dotenv from "dotenv";
import connect_db from "./config/db.js";
import products from "./data/products.js";

dotenv.config();

connect_db();

const app = express();

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);