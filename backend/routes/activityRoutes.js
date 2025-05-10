const express = require('express');
const router = express.Router();

const authJwt = require('../middleware/authJwt');
const activityController = require('../controllers/activityController');

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get all activity logs (admin only)
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved logs
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin role required
 */
router.get(
  '/', 
  authJwt.verifyToken,   // check if user is authenticated
  authJwt.isAdmin,       // check if user has Admin role
  activityController.getLogs
);

module.exports = router;
