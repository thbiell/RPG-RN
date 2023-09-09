import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, ImageBackground, Modal, ScrollView } from 'react-native';
import axios from 'axios';
import { useStore } from '../../../store';

const NewTask = ({ navigation }) => {
  const [name, setName] = useState('');
  const [period, setPeriod] = useState('daily');
  const [experience, setExperience] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const store = useStore();

  const handleCreateMission = async () => {
    try {
      const response = await axios.post('http://192.168.0.170:3001/mission/create', {
        name,
        period,
        exp: parseInt(experience),
      });
      store.createTask(response.data);
      navigation.navigate('Home');
      console.log('Missão criada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar missão:', error);
    }
  };

  const renderPeriodButtons = () => {
    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Selecione o Período</Text>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => {
            setPeriod('daily');
            setModalVisible(false);
          }}
        >
          <Text>Diária</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => {
            setPeriod('weekly');
            setModalVisible(false);
          }}
        >
          <Text>Semanal</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/Images/NewTask.png')}
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>Criar Nova Tarefa</Text>
        <ScrollView>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            
          >
        <View style={styles.view}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.modalInput}>
            <Text>{period === 'daily' ? 'Diária' : 'Semanal'}</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Nome da Tarefa"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Experiência"
            value={experience}
            onChangeText={setExperience}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateMission}
          >
            <Text style={styles.buttonText}>Criar Tarefa</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          {renderPeriodButtons()}
        </Modal>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  view: {
    flex: 1,
    marginTop: 370,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
    color: '#4B0082',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 80,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 200,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '100%',
    alignItems: 'center',
  },
  modalInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: 'center',
  },
});

export default NewTask;
