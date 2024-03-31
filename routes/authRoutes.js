// Dealing with authentication like registering a new user or to log in
const express = require('express');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail, checkPassword } = require('../models/User'); // Adjust the path as necessary
const router = express.Router();

/**
 * jwt stuff
 */
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('crypto').randomBytes(64).toString('hex');

// User registration
router.post('/register', async (req, res) => {
    const { firstName, email, password } = req.body;
    if (!firstName || !email || !password) {
        return res.status(400).send('Please provide first name, email, and password');
    }

    try {
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(400).send('User already exists with this email');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser(firstName, email, hashedPassword);
        res.status(201).send({ message: 'User created successfully', userId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error during registration');
    }
});

/**
 * Testing httpOnly cookie implementation
 */

router.post('/login', async (req, res) => {
    
    console.log(req.body);
    const {email, password} = req.body;
    console.log("Email: " + email);
    console.log("Password: " + password);

/**
 * Testing jwt stuff
 */

    try {
        const userExists = await findUserByEmail(email);
        if (userExists) {
            console.log("User exists");
            //Check if password matches stored password
            if (checkPassword( password, userExists.password)){
                const user = {
                    username: email,
                    password: password
                }
                const token = jwt.sign(user, TOKEN_SECRET, {expiresIn: '60'});
                // res.setHeader('Set-Cookie': 'token=123456, HttpOnly;')
                res.cookie(user, token, {
                    httpOnly: true,
                    // secure: true, //Send only over HTTPS (LEAVE COMMNETED IF TESTING ON LOCALHOST)
                    maxAge: 3600000
                })
                res.status(200).send("Hi");
            }
        }else {
            console.log("User doesn't exist");
            res.status(400).send('Incorrect email or password');
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error during registration');
    }
    
})

module.exports = router;
