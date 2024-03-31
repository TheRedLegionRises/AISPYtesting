const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const connection = require('./config/database')

const app = express()

app.use(express.json())

/**
 * Sets cors options to allow httponly cookies
 */
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

/**
 * connecting to database
 */
// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'aispy',
//     password: 'COMP4537AISPY',
//     database: 'aispy'
//     // waitForConnections: true,
//     // connectionLimit: 10,
//     // queueLimit: 0
//   });
// Connect to MySQL
// connection.connect(err => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return;
//     }
//     console.log('Database connection established');
//   });

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