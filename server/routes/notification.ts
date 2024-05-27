import express, { Request, Response } from 'express';
import { sendNotification } from '../controllers/notification';

export const router = express.Router();

router.post('/send-notification', (req: Request, res: Response) => sendNotification(req, res));
