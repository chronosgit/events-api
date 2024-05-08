const mongoose = require('mongoose');


// const postSchema = new mongoose.Schema({
// 	author: {
// 			type: mongoose.Schema.Types.ObjectId, ref: "User",
// 	},
// 	authorUsername: String,
// 	title: String,
// 	topic: String,
// 	text: String,
// 	date: Date,
// 	comments: [
// 			{type: Array, "default": []},
// 	],
// 	likes: [
// 			{type: mongoose.Schema.Types.ObjectId, ref: "User"},
// 	],
// 	reposts: [
// 			{type: mongoose.Schema.Types.ObjectId, ref: "User"},
// 	],
// 	isEdited: {
// 			type: Boolean,
// 			default: false,
// 	},
// });
// const Post = mongoose.model("Post", postSchema);

// module.exports = {User, Post, Comment, Notification};