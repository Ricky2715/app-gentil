import React from 'react';
import { View, Text } from 'react-native';

const BannerOferta = ({ oferta }: { oferta: string }) => (
  <View>
    <Text>{oferta}</Text>
    {/* TODO: Exibir apenas após evento positivo */}
  </View>
);

export default BannerOferta;
