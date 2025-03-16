const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.post('/register', userController.Register);
router.post('/login', userController.Login);
router.post('/logout', userController.Logout);

module.exports = router;