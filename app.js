require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

require('./config/db.js')

// Routes
const schoolRoutes = require('./routes/schoolRoutes')
app.use('/api', schoolRoutes)

// Test route
app.get('/', (req, res) => {
  res.send("API is running!")
})

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});