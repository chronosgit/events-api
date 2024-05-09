const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const verifyCredentials = require("./middleware/verifyCredentials");
const publicHealthCheck = require("./handlers/publicHealthCheck");
const privateHealthCheck = require("./handlers/privateHealthCheck");
const register = require("./handlers/register");
const login = require("./handlers/login");
const createEvent = require("./handlers/createEvent");
const getAllEvents = require("./handlers/getAllEvents");
const getSportEvents = require("./handlers/getSportEvents");
const getConcertEvents = require("./handlers/getConcertEvents");
const getExhibitionEvents = require("./handlers/getExhibitionEvents");
const createTicket = require("./handlers/createTicket");
const getAllTickets = require("./handlers/getAllTickets");
const getArchivedTickets = require("./handlers/getArchivedTickets");

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
app.get("/api/v1/healthcheck/private/", verifyCredentials, privateHealthCheck);

// Authentication
app.post("/api/v1/auth/register/", register);
app.post("/api/v1/auth/login/", login);

// Creating events
app.post("/internal/event/", createEvent);

// Getting events
app.get("/api/v1/events/all/", getAllEvents);
app.get("/api/v1/events/sport/", getSportEvents);
app.get("/api/v1/events/concert/", getConcertEvents);
app.get("/api/v1/events/exhibition/", getExhibitionEvents);

// Creating ticket
app.post("/api/v1/tickets/", verifyCredentials, createTicket);
 
// Getting user's tickets
app.post("/api/v1/tickets/all/", verifyCredentials, getAllTickets);
app.get("/api/v1/tickets/archived/", verifyCredentials, getArchivedTickets);