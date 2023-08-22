const express = require('express');
const {createUser,loginUser, findAllUser, findSingleUser} = require('../controller/userController')//{in ka use zarorri hai variable mein store karwaane k liye}
const {verifyUser} = require('../middleware/userMiddleware');
const { verify } = require('jsonwebtoken');


const userRoutes = express.Router();
userRoutes.use(express.json());
userRoutes.post('/create', createUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/findAllUsers',verifyUser, findAllUser);
// userRoutes.get('/findSingleUser/:_id', findSingleUser); // 
userRoutes.get('/findSingleUser/:id',verifyUser, findSingleUser);


module.exports = userRoutes