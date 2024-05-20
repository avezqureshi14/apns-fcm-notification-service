import apn from '@parse/node-apn'

import { APNService } from './service';

class APNServiceImpl implements APNService {
    private apnProvider: apn.Provider;

    constructor() {
        this.apnProvider = new apn.Provider({
            token: {
                key: 'path/to/APNsAuthKey_XXXXXXXXXX.p8', // Replace with your APNs authentication key file path
                keyId: 'YOUR_KEY_ID', // Replace with your APNs key ID
                teamId: 'YOUR_TEAM_ID', // Replace with your APNs team ID
            },
            production: false, // Set to true for production environment
        });
    }

    async sendNotification(note: apn.Notification, token: string): Promise<apn.Responses> {
        return this.apnProvider.send(note, token);
    }

    createNotification(payload: any): apn.Notification {
        return new apn.Notification({
            expiry: Math.floor(Date.now() / 1000) + 3600, // Expires 1 hour from now
            badge: 3,
            sound: 'ping.aiff',
            alert: '\uD83D\uDCE7 \u2709 You have a new message',
            payload: payload,
            topic: '<your-app-bundle-id>', // Replace with your app's bundle ID
        });
    }
}

export default new APNServiceImpl();
