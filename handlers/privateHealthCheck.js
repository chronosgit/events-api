const privateHealthCheck = async (req, res) => {
	try {
		const user = req.user;

		res.status(200).send({message: "Events API JWT middleware is working correctly"})
	} catch(error) {
		console.error(error);

		res.status(500).send({error: "Private health check resulted in error"});
	}
};

module.exports = privateHealthCheck;