interface FirebaseConfig {
  apiKey: string | undefined;
  projectId: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
}

const getFirebaseConfig = (): FirebaseConfig => {
  const config: FirebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  // Verifica se todas as variáveis de ambiente necessárias estão definidas
  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      console.error(`Variável de ambiente ${key} não configurada`);
      throw new Error('Erro de configuração do Firebase');
    }
  }

  return config;
};

export default getFirebaseConfig;
