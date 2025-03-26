const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const jwt = require('jsonwebtoken')
const UserModel = require('./Models/User')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const DashboardRouter = require('./Routes/DashboardRouter')
const RestaurantRouter = require('./Routes/RestaurantRouter')

require('dotenv').config()
require('./Models/db')

const app = express()

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

// CORS and middleware configuration
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

app.use(express.json())

// Routes
app.use('/api/auth', AuthRouter)
app.use('/api/dashboard', DashboardRouter)
app.use('/api/restaurants', RestaurantRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})