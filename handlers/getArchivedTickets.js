const Models = require("../models");

const getArchivedTickets = async (req, res) => {
	try {
		const username = req.user.username;
		const user = await Models.User.findOne({username: username});

		const tickets = await Models.Ticket.find({user: user, isArchived: true});

		res.status(200).send(tickets);
	} catch(error) {
		console.error(error);
		res.status(500).send({error: "Getting user's all tickets resulted in error"})
	}
};

module.exports = getArchivedTickets;