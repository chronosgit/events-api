const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const verifyJWT = require("./middleware/verifyJWT");
const publicHealthCheck = require("./handlers/publicHealthCheck");
const privateHealthCheck = require("./handlers/privateHealthCheck");
const register = require("./handlers/register");

// NOTE: Initializing app
const app = express();

// NOTE: Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// NOTE: Connecting to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/swift")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

// NOTE: Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// NOTE: Routes
// Healthchecks
app.get("/api/v1/healthcheck/public/", publicHealthCheck);
app.get("/api/v1/healthcheck/private/", verifyJWT, privateHealthCheck);

// Authentication
app.post("/api/v1/auth/register/", register);
// TODO: route for login

// Others
// TODO: route for getting all events

// TODO: route for getting concerts

// TODO: route for getting exhibitions

// TODO: route for getting sport

// TODO: route for posting application

// TODO: route for getting notifications of events