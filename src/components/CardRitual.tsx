import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CardRitual = ({ ritual, iniciado, onIniciar, onConcluir }: { ritual: string; iniciado: boolean; onIniciar: () => void; onConcluir: () => void }) => (
  <View>
    <Text>{ritual}</Text>
    <TouchableOpacity onPress={onIniciar}>
      <Text>Iniciar</Text>
    </TouchableOpacity>
    {iniciado && (
      <TouchableOpacity onPress={onConcluir}>
        <Text>Concluir</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default CardRitual;
