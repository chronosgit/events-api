const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require("express-fileupload");
require('dotenv').config();

// NOTE: Initializing app

const app = express();

// NOTE: Middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// NOTE: Connecting to MongoDB

mongoose.connect("mongodb://127.0.0.1:27017/swift")
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// NOTE: Starting server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// NOTE: Routes

// TODO: route for getting events

// TODO: route for posting application

// TODO: route for getting notifications of events