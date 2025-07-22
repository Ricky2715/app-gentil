import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { auth, db } from '../services/firebaseConfig';
import { signInAnonymously } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const OnboardingScreen = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const handleAnonLogin = async () => {
    try {
      const result = await signInAnonymously(auth);
      setUserId(result.user.uid);
      // Salvar/atualizar progresso do usuário no Firestore
      await setDoc(doc(db, 'progresso', result.user.uid), {
        onboarding: true,
        criadoEm: new Date().toISOString(),
        progresso: 0,
      }, { merge: true });
    } catch (error) {
      console.error('Erro ao logar anonimamente ou salvar progresso:', error);
    }
  };

  return (
    <View>
      <Text>Onboarding Gentil</Text>
      {/* TODO: Passos, ilustrações, seleção de objetivos */}
      <Button title="Entrar anonimamente" onPress={handleAnonLogin} />
      {userId && <Text>UID: {userId}</Text>}
    </View>
  );
};

export default OnboardingScreen;
