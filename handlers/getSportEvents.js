const Models = require("../models");

const getSportEvents = async (req, res) => {
	try {
		const allEvents = await Models.Event.find({type: "sport"});

		res.status(200).send({events: allEvents});
	} catch(error) {
		console.error(error);

		res.status(500).send({error: "Getting sport events resulted in error"});
	}
};

module.exports = getSportEvents;