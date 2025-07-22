import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { auth, db } from '../services/firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import ProgressBar from '../components/ProgressBar';
import BannerOferta from '../components/BannerOferta';
import CardPesquisa from '../components/CardPesquisa';

const CapituloScreenX = () => {
  const [lido, setLido] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [showPesquisa, setShowPesquisa] = useState(false);

  const handleMarcarComoLido = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, 'progresso', user.uid);
      await updateDoc(docRef, {
        progresso: progresso + 10, // Exemplo: incrementa 10%
      });
      setLido(true);
      setProgresso(progresso + 10);
      setShowPesquisa(true);
    }
  };

  // Buscar progresso atual ao montar
  React.useEffect(() => {
    const fetchProgresso = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'progresso', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProgresso(docSnap.data().progresso || 0);
        }
      }
    };
    fetchProgresso();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Capítulo 1: Gentileza Produtiva</Text>
      <Text style={{ marginVertical: 8 }}>
        "Produtividade sem autocobrança é possível. Celebre cada microvitória."
      </Text>
      <Text style={{ marginBottom: 16 }}>
        Técnica: Ritual da manhã gentil. Pratique 2 minutos de respiração antes de iniciar tarefas.
      </Text>
      <ProgressBar progresso={progresso} />
      {!lido && (
        <Button title="Marcar como lido" onPress={handleMarcarComoLido} />
      )}
      {lido && (
        <BannerOferta oferta="Parabéns! Conclua 3 capítulos e desbloqueie o modo premium!" />
      )}
      {showPesquisa && (
        <CardPesquisa pergunta="Como você se sentiu após este capítulo?" onResponder={() => {}} onPular={() => {}} />
      )}
    </View>
  );
};

export default CapituloScreenX;
