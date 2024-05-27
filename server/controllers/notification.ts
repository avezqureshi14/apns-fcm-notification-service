import { Request, Response } from 'express';
import { NotificationService } from '../services/service';
import { getNotificationService } from '../helper/notification';

export const sendNotification = async (req: Request, res: Response, firebaseService: NotificationService, apnService: NotificationService): Promise<void> => {
    const { token, payload, platform } = req.body;

    const notificationService = getNotificationService(platform, firebaseService, apnService);
    if (!notificationService) {
        res.status(400).send('Invalid platform specified');
        return;
    }
    try {
        await notificationService.sendNotification(token, payload);
        res.status(200).send('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send('Error sending notification');
    }
};
