const bcrypt = require('bcrypt');

module.exports = {
    //hashPassword
	createPasswordHash: async (password) => {
		try {
			const saltRounds = 10;
			return bcrypt.hashSync(password, saltRounds);
		} catch (error) {
			console.log(error)
		}
	},
    //compairing with hashed password
	comparePassword: async (oldPassword, newPassword) => {
		return bcrypt.compare(oldPassword, newPassword)
	},

}

