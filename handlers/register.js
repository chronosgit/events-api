const jwt = require("jsonwebtoken");
require('dotenv').config();
const Models = require("../models");
const generateSecretKey = require("../utils/generateSecretKey");

const register = async (req, res) => {
	try {
		const {username, password} = req.body;
		const existingUser = await Models.User.findOne({username: username});

		if(existingUser) {
			res.status(400).send({error: "User with such username already exists"});
			return;
		}

		const secret = generateSecretKey(10);
		const user = new Models.User({
			username: username, 
			password: password, 
			secret: secret,
		});
		await user.save();

		res.status(201).send({
			id: user._id,
			username: user.username,
			secret: secret,
		});
	} catch(error) {
		console.error(error);
		res.status(500).send({error: "Registering resulted in error"});
	}
}

module.exports = register;