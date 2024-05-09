const Models = require("../models");

const getAllTickets = async (req, res) => {
	try {
		const username = req.user.username;
		const user = await Models.User.findOne({username: username});

		const tickets = await Models.Ticket.find({user: user._id});
		
		const responseData = [];

		for(let ticket of tickets) {
			const event = await Models.Event.findOne({_id: ticket.event[0]});
			
			responseData.push({
				_id: ticket._id,
				quantity: ticket.quantity,
				price: ticket.price,
				isArchived: ticket.isArchived,
				event: event.name
			});
		}

		res.status(200).send({tickets: responseData});
	} catch(error) {
		console.error(error);
		res.status(500).send({error: "Getting user's all tickets resulted in error"})
	}
};

module.exports = getAllTickets;