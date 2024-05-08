const publicHealthCheck = async (req, res) => {
	try {
		res.status(200).send({message: "Events API is working correctly"})
	} catch(error) {
		console.error(error);

		res.status(500).send({error: "Public health check resulted in error"});
	}
};

module.exports = publicHealthCheck;