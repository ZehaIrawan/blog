const mongoose = require('mongoose');
require('dotenv').config(); 

const db = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(db);

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message,'ERROR');
		process.exit(1);
	}
};

module.exports = connectDB;