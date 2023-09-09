import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ImageBackground, TouchableOpacity, StyleSheet} from 'react-native'; // Importe Image do React Native
import { useStore } from '../../../store';
import { useNavigation } from '@react-navigation/native';
import { createCharacter } from '../../../api';

const SelecaoAvatar = ({ navigation }) => {
  const store = useStore();
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [exp, setExp] = useState('');
  const [needed, setNeeded] = useState('');  
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const navigationn = useNavigation();

  const handleAvatarSelection = (avatarId) => {
    const avatarImage = characterImages[avatarId];
  
    if (typeof avatarImage === 'number') {
      setSelectedAvatar(avatarId);
      setFeedbackMessage(`Avatar ${avatarId} selecionado`);
      store.setCharacter({ ...store.character, image: avatarImage });
    } else {
      console.error(`O valor de avatarImage não é um numero: ${avatarImage}`);
    }
  };
  
  const characterImages = {
    1: require('../../assets/Images/Personagem1.png'),
    2: require('../../assets/Images/Personagem2.png'),
    3: require('../../assets/Images/Personagem3.png'),
    4: require('../../assets/Images/Personagem4.png'),
    5: require('../../assets/Images/Personagem5.png'),
    6: require('../../assets/Images/Personagem6.png'),
    7: require('../../assets/Images/Personagem7.png'),
  };

  const handleLevelChange = (text) => {
    if (/^\d+$/.test(text) || text === '') {
      setLevel(text);
    }
  };

  const handleExpChange = (text) => {
    if (/^\d+$/.test(text) || text === '') {
      setExp(text);
    }
  };

  const handleNeededChange = (text) => {
    if (/^\d+$/.test(text) || text === '') {
      setNeeded(text);
    }
  };
  const handleSaveData = async () => {
    if (!name || !level || !exp || !needed || !selectedAvatar) {
      setFeedbackMessage('Preencha todos os campos e selecione um avatar.');
      return;
    }
    const selectedAvatarPath = characterImages[selectedAvatar];
  
    try {
      const intLevel = parseInt(level, 10);
      const intExp = parseInt(exp, 10);
      const intNeeded = parseInt(needed, 10);

      const response = await createCharacter(name, intLevel, intExp, intNeeded, selectedAvatarPath);

      if (response) {
        setFeedbackMessage('Dados salvos com sucesso.');
        setTimeout(() => {
          navigationn.navigate('Home');
        }, 2000);
      } else {
        setFeedbackMessage('Erro ao criar o personagem.');
      }
    } catch (error) {
      console.error('Erro ao criar o personagem:', error);
      setFeedbackMessage('Erro ao criar o personagem.');
    }
  };
  


  return (
    <ImageBackground
      source={require('../../assets/Images/imagem1.png')}
      style={styles.container}
    >
      <View style={styles.avatarContainer}>
        {Object.keys(characterImages).map((avatarId) => (
          <Pressable
            key={avatarId}
            style={[
              styles.avatarOption,
              selectedAvatar === avatarId && styles.selectedAvatarOption,
            ]}
            onPress={() => handleAvatarSelection(avatarId)}
          >
            <ImageBackground
              source={characterImages[avatarId]}
              style={styles.avatarImage}
            >
              {selectedAvatar === avatarId && (
                <View style={styles.selectionIndicator}>
                  <Text style={styles.selectionText}>Selecionado</Text>
                </View>
              )}
            </ImageBackground>
          </Pressable>
        ))}
      </View>
      <Text style={styles.feedbackMessage}>{feedbackMessage}</Text>
      <TextInput
        placeholder="Nome do Personagem"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Nível"
        value={level}
        onChangeText={handleLevelChange}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Experiência"
        value={exp}
        onChangeText={handleExpChange}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Experiência Necessária"
        value={needed}
        onChangeText={handleNeededChange}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity
        onPress={handleSaveData}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Salvar Dados</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: '#3f5739',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 5,
  },
  avatarOption: {
    margin: 10,
  },
  selectedAvatarOption: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  avatarImage: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 255, 0.7)',
    padding: 4,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  selectionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  feedbackMessage: {
    marginVertical: 10,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SelecaoAvatar;
