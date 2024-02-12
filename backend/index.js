const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();


// Dummy users and puzzles data (replace with your my own database later)
const users = [
    { username: 'user', passwordHash: '$2b$10$BOPiW.Jzb/ZzavGuVsRJee.ks7xYGXrbhhDxX.3b6Y8l0qiq.JD2e' }, // password: password
    { username: 'admin', passwordHash: '$2b$10$v3R5gIEqUoQaivVnt8YCTecdc8KJEXjwEZvHqGe1MSbUjX0miMBXq' } // password: adminpassword
  ];

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
const autheticateUser = (req, res, next)=>{
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


