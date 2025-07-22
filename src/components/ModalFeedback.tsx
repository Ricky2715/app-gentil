import React from 'react';
import { View, Text, Modal, Button } from 'react-native';

const ModalFeedback = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} transparent>
    <View>
      <Text>Deixe seu feedback (opcional)</Text>
      {/* TODO: Animação de agradecimento, campo livre */}
      <Button title="Agora não" onPress={onClose} />
    </View>
  </Modal>
);

export default ModalFeedback;
