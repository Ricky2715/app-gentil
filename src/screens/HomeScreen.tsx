import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { auth, db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import CardCapitulo from '../components/CardCapitulo';
import CardRitual from '../components/CardRitual';
import BannerOferta from '../components/BannerOferta';
import { frasesDoDia } from '../constants/frasesDoDia';

const HomeScreen = () => {
  const [progresso, setProgresso] = useState<any>(null);
  const [frase, setFrase] = useState<string>('');

  useEffect(() => {
    const fetchProgresso = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'progresso', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProgresso(docSnap.data());
        }
      }
    };
    fetchProgresso();
    // Sorteia frase do dia
    setFrase(frasesDoDia[Math.floor(Math.random() * frasesDoDia.length)]);
  }, []);

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Dashboard Gentil</Text>
        <Text style={{ marginVertical: 8, fontSize: 18 }}>{frase}</Text>
        {progresso && (
          <Text>Progresso: {progresso.progresso}% | Onboarding: {progresso.onboarding ? 'Concluído' : 'Pendente'}</Text>
        )}
        {/* Cards mock de capítulos */}
        <CardCapitulo titulo="Capítulo 1" progresso={progresso?.progresso || 0} lido={false} onPraticar={() => {}} />
        <CardCapitulo titulo="Capítulo 2" progresso={progresso?.progresso || 0} lido={false} onPraticar={() => {}} />
        {/* Cards mock de rituais */}
        <CardRitual ritual="Ritual da Manhã" iniciado={false} onIniciar={() => {}} onConcluir={() => {}} />
        <CardRitual ritual="Ritual da Noite" iniciado={false} onIniciar={() => {}} onConcluir={() => {}} />
        {/* Banner de oferta mock */}
        <BannerOferta oferta="Desbloqueie o modo premium e acesse desafios exclusivos!" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
