const express = require('express');
const router = express.Router();

const authJwt = require('../middleware/authJwt');
const activityController = require('../controllers/activityController');

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Endpoints for accessing activity logs
 */

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                     example: adminuser
 *                   action:
 *                     type: string
 *                     example: Book "War and Peace" created
 *                   details:
 *                     type: string
 *                     example: "Authors: Leo Tolstoy, Categories: Historical"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin role required
 */
router.get(
  '/',
  authJwt.verifyToken,
  authJwt.isAdmin,
  activityController.getLogs
);

module.exports = router;
