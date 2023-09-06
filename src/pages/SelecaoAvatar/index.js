import React from 'react';
import { View, Text, Pressable, ImageBackground, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { selectCharacter } from '../../reducer/gameSlice'; // Importar a action para selecionar o avatar

const SelecaoAvatar = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleAvatarSelection = (avatarId) => {
    dispatch(selectAvatar(avatarId)); // Despachar a ação para salvar a escolha do avatar no Redux
    navigation.navigate('TelaDoJogo'); // Navegar para a tela principal do jogo
  };

  // Defina um objeto com os caminhos das imagens dos personagens
  const characterImages = {
    1: require('../../assets/Images/Personagem1.png'),
    2: require('../../assets/Images/Personagem2.png'),
    3: require('../../assets/Images/Personagem3.png'),
    4: require('../../assets/Images/Personagem4.png'),
    5: require('../../assets/Images/Personagem5.png'),
    6: require('../../assets/Images/Personagem6.png'),
    7: require('../../assets/Images/Personagem7.png'),
  };

  return (
    <ImageBackground
      source='../../assets/Images/imagem1.png'
      style={styles.container}
    >
      <View style={styles.avatarContainer}>
        {Object.keys(characterImages).map((avatarId) => (
          <Pressable
            key={avatarId}
            style={styles.avatarOption}
            onPress={() => handleAvatarSelection(avatarId)}
          >
            <ImageBackground
              source={characterImages[avatarId]}
              style={styles.avatarImage}
            />
          </Pressable>
        ))}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatarOption: {
    margin: 10,
  },
  avatarImage: {
    width: 100,
    height: 100,
  },
});

export default SelecaoAvatar;
