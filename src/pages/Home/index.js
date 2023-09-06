import React from 'react';
import { View, StyleSheet, ImageBackground, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {
  const character = useSelector((state) => state.character);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/Images/imagem1.png')} // Altere para a imagem desejada
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          {/* Conteúdo da tela vai aqui */}
          <View style={styles.content}>
            <Text style={styles.characterName}>{character.name}</Text>
            <View style={styles.levelContainer}>
              <Text>Level</Text>
              <Text style={styles.level}>{character.level}</Text>
            </View>
            <Image source={character.avatarSource} style={styles.avatar} />
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('Tasks')}
            >
              <Text style={styles.buttonText}>Minhas Tarefas</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('NewTask')}
            >
              <Text style={styles.buttonText}>Adicionar Tarefa</Text>
            </Pressable>
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Cor de overlay
  },
  content: {
    alignItems: 'center',
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default Home;
