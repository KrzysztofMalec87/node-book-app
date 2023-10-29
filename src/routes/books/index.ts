import express from 'express';
import auth from '@/middleware/auth';
import { addBook, getBooks, removeBook } from '@/controllers/books';
import { Endpoint } from '@/constants/endpoints';

const router = express.Router();

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     description: Retrieve a list of books for the authenticated user
 *     tags:
 *       - Books
 *     parameters:
 *       - name: auth-token
 *         in: header
 *         required: true
 *         description: Token for user authentication
 *         type: string
 *     responses:
 *       200:
 *         description: A list of books
 *       401:
 *         description: Access denied
 */
router.get(Endpoint.BOOKS, auth, getBooks);

/**
 * @swagger
 * /api/v1/books/add:
 *   post:
 *     description: Add a new book for the authenticated user
 *     tags:
 *       - Books
 *     parameters:
 *       - name: auth-token
 *         in: header
 *         required: true
 *         description: Token for user authentication
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book added successfully
 *       401:
 *         description: Access denied
 */

router.post(Endpoint.BOOK_ADD, auth, addBook);

/**
 * @swagger
 * /api/v1/books/remove:
 *   post:
 *     description: Remove a book by ID for the authenticated user
 *     tags:
 *       - Books
 *     parameters:
 *       - name: auth-token
 *         in: header
 *         required: true
 *         description: Token for user authentication
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *             properties:
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book removed successfully
 *       401:
 *         description: Access denied
 */
router.post(Endpoint.BOOK_REMOVE, auth, removeBook);

export default router;
