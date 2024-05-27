import { NotificationService } from '../services/service';

export const getNotificationService = (platform: string, firebaseService: NotificationService, apnService: NotificationService): NotificationService | null => {
    if (platform === 'android') {
        return firebaseService;
    } else if (platform === 'ios') {
        return apnService;
    } else {
        return null;
    }
};
