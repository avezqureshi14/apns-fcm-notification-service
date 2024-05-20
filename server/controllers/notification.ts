const admin = require('firebase-admin');
const apn = require('@parse/node-apn');

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const apnProvider = new apn.Provider({
    token: {
        key: 'path/to/APNsAuthKey_XXXXXXXXXX.p8',
        keyId: 'YOUR_KEY_ID',
        teamId: 'YOUR_TEAM_ID',
    },
    production: false,
});

export const sendNotification = async (req, res) => {
    const { token, payload, platform } = req.body;

    try {
        if (platform === 'android') {
            await admin.messaging().sendToDevice(token, {
                data: payload,
            });
            res.status(200).send('Notification sent successfully to Android device');
        } else if (platform === 'ios') {
            const note = new apn.Notification({
                expiry: Math.floor(Date.now() / 1000) + 3600, // Expires 1 hour from now
                badge: 3,
                sound: 'ping.aiff',
                alert: '\uD83D\uDCE7 \u2709 You have a new message',
                payload: payload,
                topic: '<your-app-bundle-id>',
            });
            const result = await apnProvider.send(note, token);
            console.log(result);
            res.status(200).send('Notification sent successfully to iOS device');
        } else {
            res.status(400).send('Invalid platform specified');
        }
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send('Error sending notification');
    }
}
