import { Request, Response } from 'express';
import { NotificationService, FirebaseNotificationService, APNNotificationService } from '../services/service';

const firebaseNotificationService = new FirebaseNotificationService();
const apnNotificationService = new APNNotificationService();

export const sendNotification = async (req: Request, res: Response): Promise<void> => {
    const { token, payload, platform } = req.body;

    try {
        let notificationService: NotificationService;

        if (platform === 'android') {
            notificationService = firebaseNotificationService;
        } else if (platform === 'ios') {
            notificationService = apnNotificationService;
        } else {
            res.status(400).send('Invalid platform specified');
            return;
        }

        await notificationService.sendNotification(token, payload);
        res.status(200).send('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send('Error sending notification');
    }
};
