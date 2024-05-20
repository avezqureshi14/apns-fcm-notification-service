import admin from 'firebase-admin';
import { FirebaseService } from './service';

class FirebaseServiceImpl implements FirebaseService {
    async sendMessageToDevice(token: string, payload: { [key: string]: string }): Promise<void> {
        const message = {
            data: payload,
            token: token
        };

        await admin.messaging().send(message);
    }
}

export default new FirebaseServiceImpl();
