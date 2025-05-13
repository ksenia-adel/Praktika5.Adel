const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const commentController = require('../controllers/commentController');

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Manage comments on books
 */

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
 *         description: ID of the book to comment on
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
 *                 example: This book was amazing!
 *     responses:
 *       201:
 *         description: Comment created
 *       400:
 *         description: Comment content is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
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
 *         description: ID of the book
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized
 */
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
 *         description: ID of the comment
 *     responses:
 *       200:
 *         description: Comment deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Comment not found
 */
router.delete('/:commentId', authJwt.verifyToken, commentController.deleteComment);

module.exports = router;
