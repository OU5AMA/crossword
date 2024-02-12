const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();


// Dummy users and puzzles data (replace with your my own database later)
const users = [
    { username: 'user', passwordHash: '$2b$10$BOPiW.Jzb/ZzavGuVsRJee.ks7xYGXrbhhDxX.3b6Y8l0qiq.JD2e' }, // password: password
    { username: 'admin', passwordHash: '$2b$10$v3R5gIEqUoQaivVnt8YCTecdc8KJEXjwEZvHqGe1MSbUjX0miMBXq' } // password: adminpassword
  ];