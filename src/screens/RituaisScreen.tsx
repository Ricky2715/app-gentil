import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { auth } from '../services/firebaseConfig';
import { UserProgressService } from '../services/UserProgressService';
import { AnalyticsService } from '../services/AnalyticsService';
import CardRitual from '../components/CardRitual';
import NotificacaoGentil from '../components/NotificacaoGentil';

const rituaisMock = [
  { id: 1, nome: 'Ritual da Manhã', iniciado: false },
  { id: 2, nome: 'Ritual da Noite', iniciado: false },
];

const RituaisScreen = () => {
  const [rituais, setRituais] = useState(rituaisMock);
  const [notificacao, setNotificacao] = useState('');

  const handleIniciar = async (id: number) => {
    setRituais(rituais.map(r => r.id === id ? { ...r, iniciado: true } : r));
    setNotificacao('Ritual iniciado! Pratique com gentileza.');
    const user = auth.currentUser;
    if (user) {
      await UserProgressService.updateProgress(user.uid, { [`ritual_${id}_iniciado`]: true });
      await AnalyticsService.registrarEvento('ritual_iniciado', { ritualId: id });
    }
  };

  const handleConcluir = async (id: number) => {
    setRituais(rituais.map(r => r.id === id ? { ...r, iniciado: false } : r));
    setNotificacao('Parabéns! Ritual concluído.');
    const user = auth.currentUser;
    if (user) {
      await UserProgressService.updateProgress(user.uid, { [`ritual_${id}_concluido`]: true });
      await AnalyticsService.registrarEvento('ritual_concluido', { ritualId: id });
    }
    Alert.alert('Gentileza', 'Você concluiu o ritual!');
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Rituais do Dia</Text>
      {rituais.map(r => (
        <CardRitual
          key={r.id}
          ritual={r.nome}
          iniciado={r.iniciado}
          onIniciar={() => handleIniciar(r.id)}
          onConcluir={() => handleConcluir(r.id)}
        />
      ))}
      {notificacao && <NotificacaoGentil mensagem={notificacao} />}
    </View>
  );
};

export default RituaisScreen;
