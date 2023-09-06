import { createSlice } from "@reduxjs/toolkit";

// Estado inicial do jogo
const initialState = {
  character: {
    name: "",
    level: 1,
    exp: 0,
    needed: 100,
  },
  missions: [], // Uma lista de missões
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    selectCharacter: (state, action) => {
      state.character = action.payload;
    },
    addMission: (state, action) => {
      state.missions.push(action.payload);
    },
    markMissionAsDone: (state, action) => {
      const missionId = action.payload;
      const mission = state.missions.find((m) => m.id === missionId);
      if (mission) {
        mission.done = true;
      }
    },
    deleteMission: (state, action) => {
      const missionId = action.payload;
      state.missions = state.missions.filter((m) => m.id !== missionId);
    },
    updateCharacter: (state, action) => {
      state.character = { ...state.character, ...action.payload };
    },
  },
});

export const {
  selectCharacter,
  selectBackground,
  addMission,
  markMissionAsDone,
  deleteMission,
  updateCharacter,
} = gameSlice.actions;

export default gameSlice.reducer;
