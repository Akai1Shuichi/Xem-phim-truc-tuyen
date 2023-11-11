const express = require('express');
const userRouter = new express.Router();

const auth = require('../middleware/auth');
const userController = require('../controller/userController');

// Create user
userRouter.post('/register', userController.insert);

// Login user
userRouter.post('/login', userController.login);

// Logout user
userRouter.post('/logout', auth, userController.logout);

// Get User
userRouter.get('/you', auth, userController.get);

// Update User
userRouter.patch('/update', auth, userController.update);

// Delete User
userRouter.delete('/delete', auth, userController.delete);

// getdetails
userRouter.get('/all', auth, userController.getDetails);

module.exports = userRouter;
