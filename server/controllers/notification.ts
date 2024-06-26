import { Request, Response } from 'express';
import { NotificationService } from '../services/notification/service';

export const sendNotification = async (req: Request, res: Response): Promise<void> => {
    const { token, payload, platform } = req.body;

    try {
        await NotificationService.sendNotification(platform, token, payload);
        res.status(200).send('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send('Error sending notification');
    }
};
