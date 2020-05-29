const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB connection was successful')
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
