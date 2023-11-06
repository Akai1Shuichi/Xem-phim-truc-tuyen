const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth');
const userController = require('../controller/userController');

// Create user
router.post('/register', userController.insert);

// Login user
router.post('/login', userController.login);

// Logout user
router.post('/logout', auth, userController.logout);

// Get User
router.get('/you', auth, userController.get);

// Update User
router.patch('/update', auth, userController.update);

// Delete User
router.delete('/delete', auth, userController.delete);

module.exports = router;
