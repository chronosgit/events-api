const jwt = require("jsonwebtoken");
require('dotenv').config();
const Models = require("../models");

const register = async (req, res) => {
	const {username, password} = req.body;

	try {
		const existingUser = await Models.User.findOne({username: username});
		if(existingUser) {
			res.status(400).send({error: "User with such username already exists"});
			return;
		}

		const payload = {
			username: username,
		};
		const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" } );
		const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" } );

		const user = new Models.User({
			username: username, 
			password: password, 
			refreshToken: refreshToken,
		});
		await user.save();

		res.cookie("JWT", refreshToken, {httpOnly: false, maxAge: 24 * 60 * 60 * 1000}); // maxAge of 1 day
		res.status(201).send({
			id: user._id,
			username: user.username,
			accessToken: accessToken,
		});
	} catch(error) {
		console.error(error);
		res.status(500).send({error: "Registering resulted in error"});
	}
}

module.exports = register;