const express = require("express");
const percentile = require("percentile");
const mongoose = require("mongoose");
const { App } = require("./config/express.conifg");
const jwt = require("jsonwebtoken");
const { loadEnv } = require("./config/dotenv.config");
const { dbConnect } = require("./config/mongoose.config");
const User = require("./models/user.model");

loadEnv();
dbConnect();

const port = parseInt(process.env.PORT || "8080");


const app = App();
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});
app.post("/data", verifyToken, async (req, res) => {
  try {
    const isActive = true;
    const newUser = await User.create({ ...req.body, isActive });
    res.status(200).json({ newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.get("/all", verifyToken, async(req, res) => {
  try{
    const users = await User.find()
    return res.send(users)
  }
  catch (error) {
    return res.status(500).send({ success: false, message: `There was an error. ${error}` });
}
  
});

app.get("/users/:id", verifyToken, (req, res) => {
  var id = req.body._id;
  User.findOne(id, function (err, items) {
    if (err) throw error;
    return res.json(items);
  });
});

app.get("/usersData/", verifyToken,async(req, res) => {
// find the id with regex pattern
const user =  await User.find({"id": {$regex: /.*\.ccf/}});
res.json(user)
});

app.get("/calcQuartile/:id/:k", verifyToken, async(req, res) => {
  const user = await User.findOne(
    {id:req.params.id}
  );
  // console.log(user.scores)
  const newScore = calcQuartile(req.params.k, user.scores)
  // console.log(newScore)
  res.json(newScore)
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, payload) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        payload,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // if email and password is correct
  const user={
    id: 1,
    name: 'priti'
  }
  jwt.sign({ user }, "secretkey", { expiresIn: "600s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

function calcQuartile(q, arr) {
  return percentile(q, arr,item => item.$numberDecimal);
}

app.listen(port, () => {
  console.log(`Backend Server started on port ${port}`);
});
