import { create } from 'zustand';
import { fetchCharacter } from './api';
const useStore = create((set) => ({
  tasks: [],
  missions: [],
  character: null,

  setTasks: (tasks) => set({ tasks }),
  setMissions: (missions) => set({ missions }), 
  setCharacter: (character) => set({ character }),
  markTaskAsDone: (taskId) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === taskId && task.status === 'toBeDone') {
          task.status = 'done';
          state.character.exp += task.exp;
  
          while (state.character.exp >= state.character.needed) {
            state.character.level += 1;
            state.character.exp -= state.character.needed;
            state.character.needed = state.character.level * 100;
          }
        }
        return task;
      });
  
      const newState = { tasks: updatedTasks, character: state.character };
      return newState;
    });
  },
  
  loadCharacterFromApi: async () => {
    try {
      const characterData = await fetchCharacter(); 
      set({ character: characterData });
    } catch (error) {
      console.error('Erro ao carregar o personagem da API:', error);
    }
  },
  
  deleteTask: (taskId) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === taskId && task.status === 'toBeDone') {
          task.status = 'deleted';
        }
        return task;
      });
      return { tasks: updatedTasks };
    });
  },
  createTask: (taskData) => {
    set((state) => {
      const newTask = {
        name: taskData.name,
        period: taskData.period,
        exp: taskData.exp,
        id: `${state.tasks.length + 1}`,
        status: 'toBeDone',
      };
      const updatedTasks = [...state.tasks, newTask];
      return { tasks: updatedTasks };
    });
  },
  saveCharacterToApi: async (characterData) => {
    try {
      const response = await saveCharacter(characterData);     
      if (response) {
        set({ character: characterData });
      } else {
        console.error('Erro ao salvar o personagem na API');
      }
    } catch (error) {
      console.error('Erro ao salvar o personagem na API:', error);
    }
  },
}));

export { useStore };