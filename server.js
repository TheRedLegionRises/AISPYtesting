const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

/**
 * Sets cors options to allow httponly cookies
 */
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions))

const indexRoutes = require('./routes/indexRoutes')
const authRoutes = require('./routes/authRoutes')
const apiRoutes = require('./routes/apiRoutes')

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes)

app.listen(8888, () => {
    console.log('AI Spy server is running on port 8888')
})