import * as admin from 'firebase-admin';
import * as apn from '@parse/node-apn';

export interface INotificationService {
    sendNotification(token: string, payload: any): Promise<void>;
}

class FirebaseNotificationService implements INotificationService {
    async sendNotification(token: string, payload: any): Promise<void> {
        const message = {
            data: payload,
            token: token
        };

        await admin.messaging().send(message);
    }
}

class APNNotificationService implements INotificationService {
    private apnProvider: apn.Provider;

    constructor() {
        this.apnProvider = new apn.Provider({
            token: {
                key: process.env.APN_KEY_PATH || 'path/to/APNsAuthKey_XXXXXXXXXX.p8',
                keyId: process.env.APN_KEY_ID || 'YOUR_KEY_ID',
                teamId: process.env.APN_TEAM_ID || 'YOUR_TEAM_ID',
            },
            production: process.env.NODE_ENV === 'production',
        });
    }

    async sendNotification(token: string, payload: any): Promise<void> {
        const note = new apn.Notification({
            expiry: Math.floor(Date.now() / 1000) + 3600,
            badge: 3,
            sound: 'ping.aiff',
            alert: '\uD83D\uDCE7 \u2709 You have a new message',
            payload: payload,
            topic: process.env.APN_BUNDLE_ID || '<your-app-bundle-id>',
        });

        await this.apnProvider.send(note, token);
    }
}

export class NotificationServiceFactory {
    static getNotificationService(platform: string): INotificationService {
        if (platform === 'android') {
            return new FirebaseNotificationService();
        } else if (platform === 'ios') {
            return new APNNotificationService();
        } else {
            throw new Error('Invalid platform specified');
        }
    }
}

export class NotificationService {
    static async sendNotification(platform: string, token: string, payload: any): Promise<void> {
        const service = NotificationServiceFactory.getNotificationService(platform);
        await service.sendNotification(token, payload);
    }
}
