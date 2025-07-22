import OneSignal from 'react-native-onesignal';
import { Platform } from 'react-native';

// Constantes do OneSignal
const ONESIGNAL_APP_ID = process.env.REACT_APP_ONESIGNAL_APP_ID || '';

// Interface para dados do usuário
interface UserData {
  userId: string;
  email?: string;
  name?: string;
}

// Inicialização do OneSignal
export const initializeOneSignal = () => {
  // Configuração inicial
  OneSignal.setAppId(ONESIGNAL_APP_ID);
  
  // Solicitar permissão para notificações push
  OneSignal.promptForPushNotificationsWithUserResponse();
  
  // Manipulador de notificações recebidas
  OneSignal.setNotificationOpenedHandler((event: NotificationClickEvent) => {
    console.log('Notificação clicada:', event);
    // Aqui você pode adicionar a lógica de navegação baseada na notificação
  });

// Serviço de notificações push
export const NotificacaoService = {
  // Inicializar notificações para um usuário
  initializeForUser: async (userId: string, email?: string, name?: string) => {
    try {
      // Identificar usuário no OneSignal
      await OneSignal.login(userId);
      
      // Adicionar tags para segmentação
      await OneSignal.User.addTags({
        userType: 'app_gentil_user',
        email: email || '',
        name: name || ''
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao inicializar notificações:', error);
      return false;
    }
  },

  // Buscar notificações programadas
  getNotificacoes: async (userId: string) => {
    try {
      // No OneSignal, você precisa implementar isso no backend
      // Aqui podemos retornar as notificações do Firestore
      return [];
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      return [];
    }
  },

  // Pausar/desativar notificações
  optOut: async (userId: string) => {
    try {
      // Desativar notificações push
      await OneSignal.Notifications.clearAll();
      await OneSignal.logout();
      return true;
    } catch (error) {
      console.error('Erro ao desativar notificações:', error);
      return false;
    }
  },

  // Enviar notificação local (frase do dia, lembretes)
  enviarNotificacaoLocal: async (titulo: string, mensagem: string, dados = {}) => {
    try {
      await OneSignal.Notifications.add({
        title: titulo,
        body: mensagem,
        data: dados
      });
      return true;
    } catch (error) {
      console.error('Erro ao enviar notificação local:', error);
      return false;
    }
  },

  // Verificar status das permissões
  verificarPermissoes: async () => {
    try {
      const permission = await OneSignal.Notifications.hasPermission();
      return permission;
    } catch (error) {
      console.error('Erro ao verificar permissões:', error);
      return false;
    }
  }
};
