import React from 'react';
import { View } from 'react-native';

const ProgressBar = ({ progresso }: { progresso: number }) => (
  <View>
    {/* TODO: Visual leve, mostra avanço na jornada */}
    <View style={{ width: `${progresso}%`, height: 8, backgroundColor: '#AEE9D1' }} />
  </View>
);

export default ProgressBar;
