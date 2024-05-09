const jwt = require("jsonwebtoken");
require('dotenv').config();

const Models = require("../models");

const handleUserLogin = async (req, res) => {
	try {
		const {username, password} = req.body;
		const user = await Models.User.findOne({username: username});

		if(user === null) {
			return res.status(404).send({error: "Such user doesn't exist"});
		}

		if(user.password !== password) {
			res.status(403).send({error: "Invalid password"});
			return;
		} 
		delete user.password;

		res.status(200).send({
			id: user._id,
			username: user.username,
			secret: user.secret,
		});
	} catch(error) {
		console.error(error);
		return res.status(500).send({error: "Logging in resulted in error"});
	}
}

module.exports = handleUserLogin;