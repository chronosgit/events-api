const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	refreshToken: String,
	tickets: [
		{type: mongoose.Schema.Types.ObjectId, ref: "Event"},
	],
});
const User = mongoose.model("User", userSchema);

const eventSchema = new mongoose.Schema({
	image: {
		data: Buffer,
		contentType: String,
	},
	defaultImage: {
		data: Buffer,
		contentType: String,
	},
	name: {
		type: String,
		required: true,
	},
	type: { // All, Concerts, Exhibitions, Sport
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	date: {
    type: Date,
    required: true
  },
	price: {
		type: Number,
		required: true,
	},
});
const Event = mongoose.model('Event', eventSchema);

// TODO: make Ticket schema and object (active & archived)

module.exports = {User, Event};