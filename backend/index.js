const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
// const dotenv = require('dotenv').config();

const PORT = 8080;

// Dummy users and puzzles data (replace with your my own database later)
const users = [
    // Example user data
  ];

//Sign up new user
app.post('/signup', async (req, res) =>{
    const {username, password}=req.body;
    if(!username || password){
        return res.send(400).json({message: "Username and password are required"});
    }

    if(users.some(user=>user.username === username)){
        return res.status(400).json({message: "Username already exists"});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({username, passwordHash: hashedPassword});
        return res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }


})

const puzzles = [
    // example puzzle data
]; 

// Autheticate user
app.post('/login', async(req, res)=>{
    const {username , password}=req.body;
    const user= users.find(user=>user.username === username);
    if(!user){
        return res.status(404).json({message: 'User Not found'});
    }

    if(await bcrypt.compare(passoword, user.passwordHash)){
        const token = jwt.sign({username}, 'secretkey', {expiresIn: '1h'});
        return res.json({token});
    }else{
        return res.status(401).json({message: 'Invalid password'});
    }
});

// Middleware for user authenticatation
const authenticateUser = (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if(err){
            return res.status(401).json({message: 'Invalid token'});
        }
        req.user = decoded;
        next();
    });
};


// Middleware for admin authorization
const authorizeAdmin = (req, res, next)=>{
    if(req.user.username === 'admin'){
        next();
    }else{
        return res.status(403).json({message: 'Forbidden'});
    }
};

// CRUD operations for puzzles (example)

app.get('/puzzles', authenticateUser, authorizeAdmin, (req, res) => {
    // Create new puzzle
});

app.put('/puzzles/:id', authenticateUser, authorizeAdmin, (req, res)=>{
    // Update puzzle
});

app.delete('/puzzles/:id', authenticateUser, authorizeAdmin, (req, res) =>{
    // Delete puzzle
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});