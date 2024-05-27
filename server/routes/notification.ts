import express, { Request, Response } from 'express';
import { sendNotification } from '../controllers/notification';
import { FirebaseNotificationService, APNNotificationService } from '../services/service';

export const router = express.Router();
const firebaseNotificationService = new FirebaseNotificationService();
const apnNotificationService = new APNNotificationService();

router.post('/send-notification', (req: Request, res: Response) => sendNotification(req, res, firebaseNotificationService, apnNotificationService));
