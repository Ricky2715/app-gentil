// Firebase Service Worker para notificações push
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// A configuração será injetada dinamicamente pelo servidor
self.firebaseConfig = null;
let messaging = null;

// Função para inicializar o Firebase quando a configuração estiver disponível
self.initializeFirebase = (config) => {
  if (!self.firebase) {
    self.firebaseConfig = config;
    firebase.initializeApp(config);
    messaging = firebase.messaging();
  }
};

// Configuração para mensagens em background
messaging.onBackgroundMessage((payload) => {
  console.log('Recebida mensagem em background:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/_next/static/media/icon-192x192.png',
    badge: '/_next/static/media/badge.png',
    vibrate: [200, 100, 200],
    tag: 'notification-gentil',
    actions: [
      {
        action: 'open',
        title: 'Abrir App'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Manipulador de cliques nas notificações
self.addEventListener('notificationclick', (event) => {
  console.log('Notificação clicada', event);
  event.notification.close();

  if (event.action === 'open') {
    // Abre o app na rota específica
    const urlToOpen = new URL('/', self.location.origin).href;
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((windowClients) => {
        // Se já tiver uma janela aberta, foca nela
        for (let client of windowClients) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Se não tiver janela aberta, abre uma nova
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
    );
  }
});
