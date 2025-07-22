import React from 'react';
import { View, Text } from 'react-native';

const CardMicrovitoria = ({ frase, checkin }: { frase: string; checkin: boolean }) => (
  <View>
    <Text>{frase}</Text>
    <Text>Check-in: {checkin ? 'Feito' : 'Pendente'}</Text>
  </View>
);

export default CardMicrovitoria;
