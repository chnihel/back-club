import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../../ppfe-3192e-firebase-adminsdk-fbsvc-781860015c.json';
export const firebaseAdminProvider = {
    provide: 'FIREBASE_ADMIN',
    useFactory: () => {
      const defaultApp = admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as ServiceAccount
        ),
      });
      return { defaultApp };
    },
}