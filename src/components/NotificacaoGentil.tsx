import React from 'react';
import { View, Text } from 'react-native';

const NotificacaoGentil = ({ mensagem }: { mensagem: string }) => (
  <View>
    <Text>{mensagem}</Text>
    {/* TODO: Toast push/alerta discreto, frase do dia/convite para ritual */}
  </View>
);

export default NotificacaoGentil;
