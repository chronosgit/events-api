const Models = require("../models");

const verifyJWT = async (req, res, next) => {
	try {
		const secret = req.body["secret"];
		const username = req.body["username"];

		if(!secret) {
			return res.status(401).send({error: "Secret is not provided in body"});
		}

		const user = await Models.User.findOne({username: username, secret: secret});

		if(!user) {
			res.status(403).send({error: "User with such username and secret doesn't exist"});
			return;
		}

		// TODO: make req.user = {username}
		req.user = {
			username: username,
			secret: secret,
		};
		
		next();
	} catch(error) {
		console.error(error);

		res.status(500).send({error: "Refreshing a token resulted in error"});
	}
}

module.exports = verifyJWT;