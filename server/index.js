const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const jwt = require('jsonwebtoken')
const UserModel = require('./Models/User')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')

require('dotenv').config()
require('./Models/db')

const PORT = process.env.PORT || 8080

// Passport config
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const existingUser = await UserModel.findOne({ email: profile.emails[0].value });
      if (existingUser) {
        return done(null, existingUser);
      }
      
      const newUser = new UserModel({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: 'google-oauth' // You might want to handle this differently
      });
      await newUser.save();
      done(null, newUser);
    } catch (error) {
      done(error, null);
    }
  }
));

app.use(passport.initialize());

// Update CORS configuration
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

app.use(express.json())
app.use(bodyParser.json())

app.use('/auth', AuthRouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})