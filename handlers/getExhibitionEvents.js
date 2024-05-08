const Models = require("../models");

const getExhibitionEvents = async (req, res) => {
	try {
		const allEvents = await Models.Event.find({type: "exhibition"});

		res.status(200).send({events: allEvents});
	} catch(error) {
		console.error(error);

		res.status(500).send({error: "Getting exhibition events resulted in error"});
	}
};

module.exports = getExhibitionEvents;