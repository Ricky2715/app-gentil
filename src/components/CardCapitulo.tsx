import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CardCapitulo = ({ titulo, progresso, lido, onPraticar }: { titulo: string; progresso: number; lido: boolean; onPraticar: () => void }) => (
  <View>
    <Text>{titulo}</Text>
    <Text>Progresso: {progresso}%</Text>
    <Text>Status: {lido ? 'Lido' : 'Não lido'}</Text>
    <TouchableOpacity onPress={onPraticar}>
      <Text>Praticar</Text>
    </TouchableOpacity>
  </View>
);

export default CardCapitulo;
