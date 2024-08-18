const express = require("express");
require("./db/config");
const cors = require("cors");
const user = require("./db/user");
const product = require("./db/product");
const app = express();
const jwt = require("jsonwebtoken");
const JwtKey = "secret_key";

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let data = new user(req.body);
  let result = await data.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ data }, JwtKey, (err, token) => {
    if (err) {
      res.send("Something went wrong. Please try again after sometime");
    }
    res.send({ data, auth: token });
  });
});

app.post("/login", async (req, res) => {
  let data = await user.findOne(req.body).select("-password");
  if (req.body.email && req.body.password) {
    if (data) {
      jwt.sign({ data }, JwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send("Something went wrong. Please try again after sometime");
        }
        res.send({ data, auth: token });
      });
    } else {
      res.send({ result: "User Not Found" });
    }
  } else {
    res.send({ result: "User Not Found" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let Product = new product(req.body);
  let result = await Product.save();
  res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No products found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  const result = await product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "Not Found" });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, JwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please add token with header" });
  }
}
app.listen(3000);
