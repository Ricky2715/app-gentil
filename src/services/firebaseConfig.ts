// Configuração do Firebase
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';


// Validação das variáveis de ambiente
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID',
  'REACT_APP_FIREBASE_MEASUREMENT_ID',
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Variável de ambiente ${envVar} não configurada`);
  }
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.REACT_APP_FIREBASE_APP_ID!,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID!,
};

// Inicialização do Firebase com tratamento de erros
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Erro ao inicializar Firebase:', error);
  throw error;
}

// Configuração do Auth com persistência
export const auth = getAuth(app);
auth.useDeviceLanguage(); // Usa o idioma do dispositivo

// Configuração do Firestore com cache offline
export const db = getFirestore(app);
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn('Múltiplas abas abertas, persistência offline disponível em apenas uma');
    } else if (err.code === 'unimplemented') {
        console.warn('O navegador não suporta persistência offline');
    }
});

// Configuração do Messaging com Service Worker
export const messaging = getMessaging(app);
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registrado com sucesso');
    })
    .catch((err) => {
      console.error('Erro no registro do Service Worker:', err);
    });
}

// Configuração do Analytics com consentimento LGPD
export const analytics = getAnalytics(app);
setAnalyticsCollectionEnabled(analytics, false); // Desabilitado por padrão até consentimento

// Configuração do Storage com cache
export const storage = getStorage(app);

// Exporta app para uso em outros módulos
export { app };

