import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { deleteMission, markMissionAsDone } from './api'; // Importe as funções para interagir com a API
import { selectCharacter } from './actions'; // Importe a ação para selecionar o personagem

const Tasks = ({ navigation }) => {
  const dispatch = useDispatch();
  const character = useSelector((state) => state.character); // Obter informações do personagem do Redux

  const [missions, setMissions] = useState([]);

  useEffect(() => {
    // Carregar missões quando a tela for montada
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      const response = await axios.get('/mission/get-all');
      setMissions(response.data.Missions);
    } catch (error) {
      console.error('Erro ao carregar missões:', error);
    }
  };

  const handleMarkAsDone = async (missionId) => {
    try {
      await markMissionAsDone(missionId);
      loadMissions(); // Recarregar missões após marcar como concluídas
    } catch (error) {
      console.error('Erro ao marcar missão como concluída:', error);
    }
  };

  const handleDeleteMission = async (missionId) => {
    try {
      await deleteMission(missionId);
      loadMissions(); // Recarregar missões após excluir
    } catch (error) {
      console.error('Erro ao excluir missão:', error);
    }
  };

  // Renderizar cada missão em um item da lista
  const renderItem = ({ item }) => (
    <View style={styles.missionItem}>
      <Text>{item.name}</Text>
      <Text>Experiência: {item.exp}</Text>
      <Text>Período: {item.period}</Text>
      <Pressable onPress={() => handleMarkAsDone(item.id)}>
        <Text>Marcar como Concluída</Text>
      </Pressable>
      <Pressable onPress={() => handleDeleteMission(item.id)}>
        <Text>Excluir Missão</Text>
      </Pressable>
    </View>
  );

  return (
    <ImageBackground source={require('../../assets/Images/Missoes.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text>Nome do Personagem: {character.name}</Text>
        <Text>Nível: {character.level}</Text>
        <Text>Experiência: {character.exp}</Text>
        <Text>Experiência Necessária para Próximo Nível: {character.needed}</Text>
        <FlatList
          data={missions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  missionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
});

export default Tasks;
