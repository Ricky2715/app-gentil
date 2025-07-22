import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList } from 'react-native';
import { auth } from '../services/firebaseConfig';
import { UserProgressService } from '../services/UserProgressService';
import { AnalyticsService } from '../services/AnalyticsService';
import CardMicrovitoria from '../components/CardMicrovitoria';
import { frasesDoDia } from '../constants/frasesDoDia';

const MicrovitóriasScreen = () => {
  const [checkin, setCheckin] = useState(false);
  const [reflexao, setReflexao] = useState('');
  const [historico, setHistorico] = useState<string[]>([]);
  const [badge, setBadge] = useState('');
  const frase = frasesDoDia[Math.floor(Math.random() * frasesDoDia.length)];

  const handleCheckin = async () => {
    setCheckin(true);
    setBadge('Microvitória do dia!');
    setHistorico([...historico, reflexao]);
    setReflexao('');
    const user = auth.currentUser;
    if (user) {
      await UserProgressService.updateProgress(user.uid, { checkin: true, reflexao });
      await AnalyticsService.registrarEvento('microvitoria_checkin', { reflexao });
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Microvitórias</Text>
      <CardMicrovitoria frase={frase} checkin={checkin} />
      <TextInput
        placeholder="Adicione uma reflexão..."
        value={reflexao}
        onChangeText={setReflexao}
        style={{ borderWidth: 1, borderColor: '#ccc', marginVertical: 8, padding: 8 }}
      />
      <Button title="Fazer check-in" onPress={handleCheckin} disabled={checkin || !reflexao} />
      {badge && <Text style={{ marginTop: 12, color: '#4CAF50', fontWeight: 'bold' }}>{badge}</Text>}
      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>Histórico de reflexões:</Text>
      <FlatList
        data={historico}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <Text>- {item}</Text>}
      />
    </View>
  );
};

export default MicrovitóriasScreen;
