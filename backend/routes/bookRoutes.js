const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book (admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Book created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin role required
 */
// Admin-only routes
router.post('/', authJwt.verifyToken, authJwt.isAdmin, bookController.createBook);   // create book

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID (admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Book not found
 */
router.put('/:id', authJwt.verifyToken, authJwt.isAdmin, bookController.updateBook); // update book

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID (admin only)
 *     tags: [Books]
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
 *         description: Book deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin role required
 *       404:
 *         description: Book not found
 */
router.delete('/:id', authJwt.verifyToken, authJwt.isAdmin, bookController.deleteBook); // delete book

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books (any authenticated user)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of books
 *       401:
 *         description: Unauthorized
 */
// accessible by all authenticated users
router.get('/', authJwt.verifyToken, bookController.getAllBooks); // get all books

router.get('/:id', authJwt.verifyToken, bookController.getBookById); // by id


module.exports = router;
