const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const passport = require("passport")
const authController = require('./controllers/authController')
const productController = require('./controllers/productController')
const uploadController = require('./controllers/uploadController')
const updateUser = require("./controllers/updateuser")
const passportSetup = require("./passport")
const session = require("express-session")
const app = express()


mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, () => console.log('DB is successfully connected'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(
	session({
		secret: "bddsjhdbgh",
		name: "session",
		resave:false,
		saveUninitialized:false,
		keys: ["amir"],
		maxAge: 24 * 60 * 60 * 100,
	})
);


app.use(passport.initialize())
app.use(passport.session())
app.use('/images', express.static('public/images'))
app.use('/auth', authController)
app.use('/product', productController)
app.use('/upload', uploadController)
app.use('/user',updateUser)


app.listen(process.env.PORT, () => console.log(`Server has been started successfully on `))
