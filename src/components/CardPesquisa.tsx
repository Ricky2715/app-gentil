import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CardPesquisa = ({ pergunta, onResponder, onPular }: { pergunta: string; onResponder: (resposta: string) => void; onPular: () => void }) => (
  <View>
    <Text>{pergunta}</Text>
    <TouchableOpacity onPress={() => onResponder('sim')}>
      <Text>Responder</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPular}>
      <Text>Pular</Text>
    </TouchableOpacity>
  </View>
);

export default CardPesquisa;
