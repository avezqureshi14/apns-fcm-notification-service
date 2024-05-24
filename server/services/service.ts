import * as admin from 'firebase-admin';
import * as apn from '@parse/node-apn';

export interface NotificationService {
    sendNotification(token: string, payload: any): Promise<void>;
}

export class FirebaseNotificationService implements NotificationService {
    async sendNotification(token: string, payload: any): Promise<void> {
        const message = {
            data: payload,
            token: token
        };

        await admin.messaging().send(message);
    }
}

export class APNNotificationService implements NotificationService {
    private apnProvider: apn.Provider;

    constructor() {
        this.apnProvider = new apn.Provider({
            token: {
                key: 'path/to/APNsAuthKey_XXXXXXXXXX.p8', // Replace with your APNs authentication key file path
                keyId: process.env.APN_KEY_ID || 'YOUR_KEY_ID', // Replace with your APNs key ID
                teamId: process.env.APN_TEAM_ID || 'YOUR_TEAM_ID', // Replace with your APNs team ID
            },
            production: process.env.NODE_ENV === 'production', // Set to true for production environment
        });
    }

    async sendNotification(token: string, payload: any): Promise<void> {
        const note = new apn.Notification({
            expiry: Math.floor(Date.now() / 1000) + 3600, // Expires 1 hour from now
            badge: 3,
            sound: 'ping.aiff',
            alert: '\uD83D\uDCE7 \u2709 You have a new message',
            payload: payload,
            topic: process.env.APN_BUNDLE_ID || '<your-app-bundle-id>', // Replace with your app's bundle ID
        });

        await this.apnProvider.send(note, token);
    }
}
