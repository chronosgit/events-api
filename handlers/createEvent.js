const Models = require("../models");

const createEvent = async (req, res) => {
	try {
		const {name, type, location, price, date} = req.body;
		const validEventTypes = [
			"concerts", "sport",
			"exhibitions", "all", 
		];

		if(typeof type !== "string") {
			res.status(400).send({error: "Event type must be string type"});
			return;
		}

		if(!validEventTypes.includes(type.toLowerCase())) {
			res.status(400).send({
				error: "Only 'concerts', 'exhibitions', 'all' and 'sport' types are valid"
			});
			return;
		}

		// TODO: handle images

		const newEvent = new Models.Event({
			name: name, type: type, price: price, 
			location: location, date: new Date(date),
		});
		await newEvent.save();

		res.status(201).send(newEvent);
	} catch(error) {
		console.error(error);

		res.status(500).send({error: "Creating new event resulted in error"});
	}
};

module.exports = createEvent;