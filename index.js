const express = require('express')//Initialize express app
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Address = require('./model/models')


const app = express();//Initialize the sever

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))


// Connecting to DB

mongoose.connect('mongodb://localhost:27017/AddressBook', {useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log('connected to db')
   }).catch((error) => {
    console.log(error)
})



app.get('/:id', (req, res) =>{
	Address.findById(req.params.id, (err, user) =>{
		res.send(user)
	})
})


// Adding a User to AddressBook

app.post('/', (req, res) => {
    firstName = req.body.firstName,
    lastName = req.body.lastName,
    email = req.body.email,
    phone = req.body.phone
    
 
    let newAddress = new Address({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
            
    })
 
    newAddress.save().then((address) => {
            res.send(address)
    }).catch((err) => {
            console.log(error)
    })
})

// Updating the User in AddressBook

app.post('/update/:id', (req, res) => {
	let address = {}
    if (req.body.firstName) address.firstName = req.body.firstName
    if (req.body.lastName) address.lastName = req.body.lastName
	if (req.body.email) address.email = req.body.email
	if (req.body.phone) address.phone = req.body.phone
	

	address = { $set: address }

	Address.update({_id: req.params.id}, address).then(() => {
		res.send(address)
	}).catch((err) => {
		console.log(error)
	})
})


// Deleting the User from AddressBook

app.delete('/delete/:id', (req, res) => {
	Address.deleteOne({_id: req.params.id}).then(() => {
		res.send('user deleted')
	}).catch((err) => {
		console.log(error)
	})
})


app.listen(3000, () => {
    console.log('sever listening on port:3000');
});