const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const userController = require('../controllers/userController');

// admin-only: get all users
router.get('/', [authJwt.verifyToken, authJwt.isAdmin], userController.getAllUsers);

// admin-only: delete user by ID
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser);

module.exports = router;
