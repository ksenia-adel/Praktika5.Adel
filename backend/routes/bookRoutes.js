const express = require('express');
const router = express.Router();
const authJwt = require('../middleware/authJwt');
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Endpoints for managing books (create, update, delete, read)
 */

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book (admin only)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - publicationYear
 *             properties:
 *               title:
 *                 type: string
 *                 example: War and Peace
 *               publicationYear:
 *                 type: integer
 *                 example: 1869
 *               authorNames:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Leo Tolstoy"]
 *               categoryNames:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Historical Fiction"]
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Title and year are required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin role required
 */
router.post('/', authJwt.verifyToken, authJwt.isAdmin, bookController.createBook);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authJwt.verifyToken, bookController.getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authJwt.verifyToken, bookController.getBookById);

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
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publicationYear:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *               authorNames:
 *                 type: array
 *                 items:
 *                   type: string
 *               categoryNames:
 *                 type: array
 *                 items:
 *                   type: string
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
router.put('/:id', authJwt.verifyToken, authJwt.isAdmin, bookController.updateBook);

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
router.delete('/:id', authJwt.verifyToken, authJwt.isAdmin, bookController.deleteBook);

module.exports = router;
