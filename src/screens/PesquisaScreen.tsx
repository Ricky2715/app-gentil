import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { auth } from '../services/firebaseConfig';
import { PesquisaService } from '../services/PesquisaService';

const PesquisaScreen = () => {
  const [resposta, setResposta] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [badge, setBadge] = useState('');

  const handleEnviar = async () => {
    const user = auth.currentUser;
    await PesquisaService.enviarResposta(user ? user.uid : 'anon', { resposta });
    setEnviado(true);
    setBadge('Obrigado! Você ganhou um badge.');
  };

  const handlePular = () => {
    setEnviado(true);
    setBadge('Pesquisa pulada.');
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Pesquisa</Text>
      <Text style={{ marginVertical: 8 }}>Como você avalia sua experiência hoje?</Text>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Button title="😀" onPress={() => setResposta('feliz')} />
        <Button title="😐" onPress={() => setResposta('neutro')} />
        <Button title="😔" onPress={() => setResposta('triste')} />
      </View>
      <TextInput
        placeholder="Comentário opcional (anônimo)"
        value={resposta}
        onChangeText={setResposta}
        style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8 }}
      />
      <Button title="Enviar resposta" onPress={handleEnviar} disabled={enviado || !resposta} />
      <Button title="Pular" onPress={handlePular} disabled={enviado} />
      {badge && <Text style={{ marginTop: 12, color: '#2196F3', fontWeight: 'bold' }}>{badge}</Text>}
    </View>
  );
};

export default PesquisaScreen;
