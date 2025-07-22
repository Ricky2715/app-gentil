// Serviço de progresso do usuário
import { db } from './firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const UserProgressService = {
  getProgress: async (userId: string) => {
    const docRef = doc(db, 'progresso', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },
  updateProgress: async (userId: string, data: any) => {
    const docRef = doc(db, 'progresso', userId);
    await setDoc(docRef, data, { merge: true });
  },
};
