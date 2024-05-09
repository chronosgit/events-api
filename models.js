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
	secret: String,
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
	hasImage: {
		type: Boolean,
		default: false,
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

const ticketSchema = new mongoose.Schema({
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	isArchived: {
		type: Boolean,
		required: true,
		default: false,
	},
	event: [
		{type: mongoose.Schema.Types.ObjectId, ref: "Event"},
	],
	user: [
		{type: mongoose.Schema.Types.ObjectId, ref: "User"},
	],
});
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = {User, Event, Ticket};