import express from 'express';
import { registerUser, loginUser } from '@/controllers/user';
import { Endpoint } from '@/constants/endpoints';

const router = express.Router();

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     description: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: Registered successfully
 *       400:
 *         description: User already exists or invalid input
 *       500:
 *         description: Internal server error
 */

router.post(Endpoint.REGISTER, registerUser);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     description: Log in with username and password
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Invalid credentials, user not found or invalid input
 *       500:
 *         description: Internal server error
 */

router.post(Endpoint.LOGIN, loginUser);

export default router;
