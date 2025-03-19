const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')

require('dotenv').config()
require('./Models/db')

const PORT = process.env.PORT || 8080

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