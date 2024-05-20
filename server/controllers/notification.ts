import { Request, Response } from 'express';
import firebaseService from '../services/firebase-service';
import apnService from '../services/apn-service';

export const sendNotification = async (req: Request, res: Response): Promise<void> => {
    const { token, payload, platform } = req.body;

    try {
        if (platform === 'android') {
            await firebaseService.sendMessageToDevice(token, payload);
            res.status(200).send('Notification sent successfully to Android device');
        } else if (platform === 'ios') {
            const note = apnService.createNotification(payload);
            const result = await apnService.sendNotification(note, token);
            console.log(result);
            res.status(200).send('Notification sent successfully to iOS device');
        } else {
            res.status(400).send('Invalid platform specified');
        }
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send('Error sending notification');
    }
};
