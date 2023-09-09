import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';

const Welcome = ({ navigation }) => {
  const handleStartPress = () => {
    navigation.navigate('Selecao Avatar');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/Images/BemVindo.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>         
          <Text style={styles.welcomeText}>Bem-vindo ao RPG da realidade, um jogo onde você pode criar um avatar com imagem, criar missões e aumentar o level, vai nessa!</Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
            <Text style={styles.startButtonText}>Começar</Text>
          </TouchableOpacity>
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
    flex: 1,
    alignItems: 'center',
    marginTop: 100
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'#7B68EE'
  },
  startButton: {
    marginTop: 450,
    backgroundColor: '#4169E1',
    padding: 15,
    borderRadius: 5,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Welcome;
