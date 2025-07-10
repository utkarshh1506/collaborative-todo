const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes.js')


dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

