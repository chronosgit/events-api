const generateRandomKey = (length) => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let randomKey = "";

	for (let i = 0; i < length; i++) {
		randomKey += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	
	return randomKey;
};

module.exports = generateRandomKey;
