import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Verifica se todas as variáveis necessárias estão definidas
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
for (const field of requiredFields) {
  if (!firebaseConfig[field as keyof typeof firebaseConfig]) {
    console.error(`Variável de ambiente ${field} não configurada`);
    throw new Error('Erro de configuração do Firebase');
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const initMessaging = async () => {
  try {
    if (typeof window !== 'undefined' && await isSupported()) {
      const messaging = getMessaging(app);
      // Solicita permissão para notificações
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Get registration token. Initially this makes a network call
        const token = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
        });
        console.log('Token do FCM:', token);
        return token;
      }
      console.log('Permissão de notificação negada');
      return null;
    }
    console.log('Firebase Messaging não é suportado neste ambiente');
    return null;
  } catch (error) {
    console.error('Erro ao inicializar Firebase Messaging:', error);
    return null;
  }
};

export { app, initMessaging };

