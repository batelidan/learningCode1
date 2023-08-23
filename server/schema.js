const mongoose = require('mongoose');
/* Creating the schema with name, email, password and date */
const CodeSchema = new mongoose.Schema({
	key: {
	type: Number,
	required: true
	},
	title: {
	type: String,
	required: true
	},
	correctCode: {
	type: String,
	required: true
	},
	incorrectCode: {
        type: String,
        required: true
	}
});

/* Exporting schema with collection as CrudOperations */
const User = mongoose.model('Data', CodeSchema);

module.exports = User;
