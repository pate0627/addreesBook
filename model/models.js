const mongoose = require('mongoose')



// Schema for AddressBook
const addressSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
    },
    lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	}
})

//Creating the collection Address
const Address = mongoose.model('Address', addressSchema)

module.exports = Address;