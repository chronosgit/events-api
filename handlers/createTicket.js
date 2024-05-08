const Models = require("../models");

const createTicket = async (req, res) => {
	try {
		const username = req.user.username;
		const user = await Models.User.findOne({username: username});
		const eventId = req.query.eventId;
		

		if(!user) {
			res.status(404).send({error: "User, creating a ticket, doesn't exist"});
		}

		const userTicketsIds = user.tickets;
		for(let userTicketId of userTicketsIds) {
			if(String(userTicketId._id) === eventId) {
				res.status(409).send({error: "Ticket on this event already exists"});
				return;
			}
		}

		const event = await Models.Event.findOne({_id: eventId});
		await Models.User.findOneAndUpdate({username: username}, {$push: {tickets: event}});

		res.status(200).send({message: "Ticket is created"});
	} catch(error) {
		console.error(error);

		res.status(500).send({error: "Creating ticket resulted in error"});
	}
};

module.exports = createTicket;