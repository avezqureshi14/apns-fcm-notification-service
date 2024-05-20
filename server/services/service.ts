import admin from 'firebase-admin'
import apn from '@parse/node-apn'
export interface FirebaseService {
    sendMessageToDevice(token: string, payload: admin.messaging.MessagingPayload): Promise<void>;
}

export interface APNService {
    sendNotification(note: apn.Notification, token: string): Promise<apn.Responses>;
    createNotification(payload: any): apn.Notification;
}
