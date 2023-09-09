import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.170:3001';

export const createCharacter = async (name, level, exp, needed, image) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/character/create`, { name, level, exp, needed, image });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMissions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mission/getAll`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markMissionAsDone = async (missionId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mission/${missionId}/done`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchCharacter = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/character`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMission = async (missionId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mission/${missionId}/delete`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
