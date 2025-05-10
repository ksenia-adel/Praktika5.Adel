const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const userController = require('../controllers/userController');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin role required
 */
// get all users (admin only)
router.get('/', [authJwt.verifyToken, authJwt.isAdmin], userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin role required
 *       404:
 *         description: User not found
 */
// delete a user by ID (admin only)
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser);

module.exports = router;
