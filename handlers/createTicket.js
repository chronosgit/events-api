const Models = require("../models");

const createTicket = async (req, res) => {
	try {
		const {quantity, price} = req.body;

		if(quantity == null || price == null) {
			res.status(400).send({error: "Request must contain quantity and price"});
			return;
		}

		const username = req.user.username;
		const user = await Models.User.findOne({username: username});
		const eventId = req.query.eventId;
		
		if(!user) {
			res.status(404).send({error: "User, creating a ticket, doesn't exist"});
			return;
		}

		// TODO: check if ticket already exists
		const tickets = await Models.Ticket.find({user: user._id});
		for(let ticket of tickets) {
			const ticketEventId = String(ticket.event);

			if(ticketEventId === eventId) {
				res.status(409).send({error: "Ticket on this event by user already exists"})
				return;
			}
		}

		const event = await Models.Event.findOne({_id: eventId});

		if(!event) {
			res.status(404).send({error: "Event with such id doesn't exist"});
			return;
		}

		const newTicket = new Models.Ticket({
			quantity, price, event: event, user: user
		});
		await newTicket.save();

		res.status(201).send(newTicket);
	} catch(error) {
		console.error(error);

		res.status(500).send({error: "Creating ticket resulted in error"});
	}
};

module.exports = createTicket;