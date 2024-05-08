const mongoose = require('mongoose');
const eventSchema = require('./schemas.js');
const userSchema = require('./schemas.js');

const User = mongoose.model("User", userSchema);
const Event = mongoose.model('Event', eventSchema);

// TODO: make Ticket schema and object (active & archived)

module.exports = {User, Event};