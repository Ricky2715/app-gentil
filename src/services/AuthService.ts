// Serviço de autenticação (Firebase Auth)
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

export const AuthService = {
  login: async (email: string, senha: string) => {
    return await signInWithEmailAndPassword(auth, email, senha);
  },
  logout: async () => {
    return await signOut(auth);
  },
  register: async (email: string, senha: string) => {
    return await createUserWithEmailAndPassword(auth, email, senha);
  },
};
