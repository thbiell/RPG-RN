import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const NewTask = ({ navigation }) => {
  const [name, setName] = useState('');
  const [period, setPeriod] = useState('');
  const [experience, setExperience] = useState('');

  const handleCreateMission = async () => {
    try {
      const response = await axios.post('/mission/create', {
        name,
        period,
        experience: parseInt(experience), // Certifique-se de que a experiência seja um número
      });
      
      // Lógica adicional, como atualizar a lista de missões ou navegar para outra tela
      console.log('Missão criada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar missão:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Criar Nova Missão</Text>
      <TextInput
        placeholder="Nome da Missão"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Período"
        value={period}
        onChangeText={setPeriod}
        style={styles.input}
      />
      <TextInput
        placeholder="Experiência"
        value={experience}
        onChangeText={setExperience}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Criar Missão" onPress={handleCreateMission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default NewTask;
