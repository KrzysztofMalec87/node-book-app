import express from 'express';
import { regenerateToken } from '@/controllers/regenerateToken';
import { Endpoint } from '@/constants/endpoints';

const router = express.Router();

/**
 * @swagger
 * /api/v1/regenerate-token:
 *   post:
 *     description: Regenerate a new access token using a refresh token
 *     tags:
 *       - Token
 *     parameters:
 *       - in: body
 *         name: token
 *         description: Refresh token details
 *         schema:
 *           type: object
 *           required:
 *             - refreshToken
 *           properties:
 *             refreshToken:
 *               type: string
 *               description: The refresh token provided during login or previous token regeneration.
 *     responses:
 *       200:
 *         description: Token regenerated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Invalid payload
 *       401:
 *         description: Invalid token or invalid token type
 *       500:
 *         description: Internal server error
 */
router.post(Endpoint.REGENERATE_TOKEN, regenerateToken);

export default router;
