import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text, Pressable, Image } from 'react-native';
import { useStore } from '../../../store';

const Home = ({ navigation }) => {
  const character = useStore((state) => state.character);
  const loadCharacterFromApi = useStore((state) => state.loadCharacterFromApi);
  const expPercentage = (character.exp / character.needed) * 100;

  useEffect(() => {
    loadCharacterFromApi();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/Images/imagem2.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.characterName}>
              {character.name}
            </Text>
            <View style={styles.levelContainer}>
              <Text style={styles.TextLevel}>Level</Text>
              <Text style={styles.level}>{character.level}</Text>
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: '100%' }
                  ]}
                ></View>
                <View
                  style={[
                    styles.progressBar,
                    styles.progressBar2,
                    { width: `${expPercentage}%` }
                  ]}
                ></View>
              </View>
            </View>
            <Image
              source={character.image}
              style={styles.avatar}
            />
            <View style={styles.direction}>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('Tarefas')}
              >
                <Text style={styles.buttonText}>Minhas Tarefas</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('Nova Tarefa')}
              >
                <Text style={styles.buttonText}>Adicionar Tarefa</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    width: 250,
    
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#3f5739',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 5,
  },
  progressBar2: {
    backgroundColor: '#ff9900', 
    position: 'absolute', 
    height: 10,
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 5,
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  level: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  TextLevel:{
    fontSize: 17,
    fontWeight: 'bold', 
  },
  avatar: {
    width: 300,
    height: 300,
    borderRadius: 50,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3f5739',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    marginHorizontal: 22,
  },
  buttonText: {
    color: 'white',
  },
  direction: {
    flexDirection: 'row',
    marginTop: 250,
  },
});

export default Home;
