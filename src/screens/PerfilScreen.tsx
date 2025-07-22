import React, { useState, useEffect } from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { auth } from '../services/firebaseConfig';
import { UserProgressService } from '../services/UserProgressService';
import { AuthService } from '../services/AuthService';

const PerfilScreen = () => {
  const [user, setUser] = useState<any>(null);
  const [progresso, setProgresso] = useState<any>(null);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [pesquisasAtivas, setPesquisasAtivas] = useState(true);

  useEffect(() => {
    setUser(auth.currentUser);
    const fetchProgresso = async () => {
      if (auth.currentUser) {
        const data = await UserProgressService.getProgress(auth.currentUser.uid);
        setProgresso(data);
      }
    };
    fetchProgresso();
  }, []);

  const handleLogout = async () => {
    await AuthService.logout();
    setUser(null);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Perfil</Text>
      {user && (
        <>
          <Text>Email: {user.email || 'Anônimo'}</Text>
          <Text>UID: {user.uid}</Text>
        </>
      )}
      {progresso && (
        <Text>Progresso: {progresso.progresso || 0}%</Text>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        <Text>Notificações gentis</Text>
        <Switch value={notificacoesAtivas} onValueChange={setNotificacoesAtivas} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text>Pesquisas internas</Text>
        <Switch value={pesquisasAtivas} onValueChange={setPesquisasAtivas} />
      </View>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
};

export default PerfilScreen;
