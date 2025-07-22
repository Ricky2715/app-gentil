import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import BannerOferta from '../components/BannerOferta';

const BonusScreen = () => {
  const handleDesafio = () => {
    Alert.alert('Desafio', 'Desafio ativado! Pratique gentileza hoje.');
  };

  const handleCartaFuturo = () => {
    Alert.alert('Carta ao Futuro', 'Escreva uma mensagem para você mesmo daqui 1 mês.');
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Bônus</Text>
      <Text style={{ marginVertical: 8, fontWeight: 'bold' }}>Desafios</Text>
      <Button title="Ativar desafio do dia" onPress={handleDesafio} />
      <Text style={{ marginVertical: 8, fontWeight: 'bold' }}>Carta ao Futuro</Text>
      <Button title="Escrever carta" onPress={handleCartaFuturo} />
      <Text style={{ marginVertical: 8, fontWeight: 'bold' }}>Manifesto Gentil</Text>
      <Text style={{ marginBottom: 16 }}>
        "A produtividade gentil valoriza o bem-estar acima da cobrança. Celebre conquistas, respeite seu ritmo."
      </Text>
      <BannerOferta oferta="Convite: Junte-se à comunidade premium e desbloqueie mentorias!" />
    </View>
  );
};

export default BonusScreen;
