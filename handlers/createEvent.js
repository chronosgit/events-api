const fs = require("fs");
const path = require("path");
const Models = require("../models");

const createEvent = async (req, res) => {
	try {
		const {name, type, location, price, date, image} = req.body;
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

		const rootDir = path.resolve(__dirname, '../');
		const newEvent = new Models.Event({
			name: name, type: type, price: price, 
			location: location, date: new Date(date),
			defaultImage: {
				data: fs.readFileSync(path.join(rootDir + "/images/defaultEventPic.jpg")),
				type: 'Buffer',
			},
		});
		await newEvent.save();

		const profilePicBuffer = newEvent.hasImage ? newEvent.image : newEvent.defaultImage; 
		const profilePicBase64 = Buffer.from(profilePicBuffer.data, "base64").toString("base64");

		const resBody = {
			name: newEvent.name,
			type: newEvent.type,
			price: newEvent.price,
			location: newEvent.location,
			date: newEvent.date,
			image: profilePicBase64,
		};
		res.status(201).send(resBody);
	} catch(error) {
		console.error(error);

		res.status(500).send({error: "Creating new event resulted in error"});
	}
};

module.exports = createEvent;