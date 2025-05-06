import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { sendNotificationDTO } from './dto/send-notification.dto';
@Injectable()
export class NotificationService {
  async sendNotifToMultiple(notification: sendNotificationDTO) {
    try {
      if (!notification.deviceIds || notification.deviceIds.length === 0) {
        throw new Error('deviceIds est requis et ne peut pas être vide');
      }
  
      console.log('Token Firebase reçu for backend:', notification.deviceIds);
  
      const message = {
        notification: {
          title: notification.title,
          body: notification.body,
        },
        tokens: notification.deviceIds,
      };
  
      const response = await firebase.messaging().sendEachForMulticast(message);
      console.log(`${response.successCount} notifications envoyées.`);
      return response;
    } catch (error) {
      console.error('Erreur d’envoi Firebase:', error);
      throw error;
    }
  }

  

 
}