const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const commentController = require('../controllers/commentController');

/**
 * @swagger
 * /api/comments/{bookId}:
 *   post:
 *     summary: Create a comment for a book
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       401:
 *         description: Unauthorized
 */
// create a comment for a book (only authenticated users)
router.post('/:bookId', authJwt.verifyToken, commentController.createComment);

/**
 * @swagger
 * /api/comments/{bookId}:
 *   get:
 *     summary: Get all comments for a book
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: bookId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of comments
 *       401:
 *         description: Unauthorized
 */
// get all comments for a book (only authenticated users)
router.get('/:bookId', authJwt.verifyToken, commentController.getCommentsByBook);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment (only owner or admin)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Comment deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Comment not found
 */
// delete a comment (only comment owner or admin)
router.delete('/:commentId', authJwt.verifyToken, commentController.deleteComment);

module.exports = router;
