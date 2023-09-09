import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Pressable } from 'react-native';
import { useStore } from '../../../store'; 
import { fetchMissions, markMissionAsDone, deleteMission, fetchCharacter } from '../../../api';

const Tasks = ({ navigation }) => {
  const store = useStore(); 

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      const missions = await fetchMissions();
      store.setMissions(missions);
    } catch (error) {
      console.error('Erro ao carregar missões:', error);
    }
  };

  const handleMarkAsDone = async (missionId) => {
    try {
      await markMissionAsDone(missionId);
      loadMissions();
      await loadCharacterFromApi();
    } catch (error) {
      console.error('Erro ao marcar missão como concluída:', error);
    }
  };
  const handleDeleteMission = async (missionId) => {
    try {
      await deleteMission(missionId);
      loadMissions();
      loadCharacterFromApi();
    } catch (error) {
      console.error('Erro ao excluir missão:', error);
    }
  };
  const loadCharacterFromApi = async () => {
    try {
      const characterData = await fetchCharacter();
      characterData.image = store.character.image;
      while (characterData.exp >= characterData.needed) {
        characterData.level += 1;
        characterData.exp -= characterData.needed;
        characterData.needed = (characterData.level + 1) * 100;
      }
      store.setCharacter(characterData);
    } catch (error) {
      console.error('Erro ao carregar o personagem da API:', error);
    }
  };
  
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
        <Text>Nome do Personagem: {store.character.name}</Text>
        <Text>Nível: {store.character.level}</Text>
        <Text>Experiência: {store.character.exp}</Text>
        <Text>Experiência Necessária para Próximo Nível: {store.character.needed}</Text>
        <FlatList
          data={store.missions}
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
