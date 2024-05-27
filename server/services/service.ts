import * as admin from 'firebase-admin';
import * as apn from '@parse/node-apn';

export interface NotificationService {
    sendNotification(platform: string, token: string, payload: any): Promise<void>;
}

export class NotificationServiceImpl implements NotificationService {
    private firebaseService: FirebaseNotificationService;
    private apnService: APNNotificationService;

    constructor() {
        this.firebaseService = new FirebaseNotificationService();
        this.apnService = new APNNotificationService();
    }

    async sendNotification(platform: string, token: string, payload: any): Promise<void> {
        if (platform === 'android') {
            await this.firebaseService.sendNotification(token, payload);
        } else if (platform === 'ios') {
            await this.apnService.sendNotification(token, payload);
        } else {
            throw new Error('Invalid platform specified');
        }
    }
}

class FirebaseNotificationService {
    async sendNotification(token: string, payload: any): Promise<void> {
        const message = {
            data: payload,
            token: token
        };

        await admin.messaging().send(message);
    }
}

class APNNotificationService {
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
