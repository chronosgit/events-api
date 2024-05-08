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

		const payload = {
			username: user.username,
		}
		const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m",});
		const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d",});
		user.refreshToken = refreshToken; // store a user's new refresh token as well
		await user.save();

		res.cookie("JWT", refreshToken, {httpOnly: false, maxAge: 24 * 60 * 60 * 1000}); // maxAge of 1 day
		res.status(200).send({
			id: user._id,
			username: user.username,
			accessToken: accessToken,
		});
	} catch(error) {
		console.error(error);
		return res.status(500).send({error: "Logging in resulted in error"});
	}
}

module.exports = handleUserLogin;