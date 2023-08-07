const jwt = require("jsonwebtoken");

const generateToken = async (data) => {
	let jwtSecretKey = process.env.JWT_SECRET_KEY;
	const token = jwt.sign(data, jwtSecretKey, {
         expiresIn: 86400000 // 1 day
       }
	);
	return token;
};

module.exports = {generateToken};