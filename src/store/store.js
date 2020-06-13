import {configureStore, createSlice} from "@reduxjs/toolkit";

const toDos = createSlice({
  name: "toDosReducer",
  initialState: {
    schedule:[],
    latlng:[],
    tripDate: null,
    itineraryId : '',
    AreaCodes: [],
    isPage: "",
    selectDate: "",
  },
  reducers: {
    setTripDate:(state, action)=>{
      state.tripDate = action.payload;
    },
    setItineraryId:(state, action)=>{
      state.itineraryId = action.payload;
    },
    setSchedule:(state, action)=>{
      state.schedule=[...state.schedule,action.payload];
    },
    initSchedule:(state)=>{
      state.schedule=[];
    },
    setAreaCodes:(state, codes)=>{
      state.AreaCodes = codes.payload;
    },
    setPage:(state, action)=>{
      state.isPage = action.payload;
    },
    setDate:(state, action)=>{
      state.selectDate = action.payload;
    }
  }
});

export const {
    setTripDate,
    setItineraryId,
    setSchedule,
    initSchedule,
    setAreaCodes,
    setPage,
    setDate
} = toDos.actions;

export default configureStore({ reducer: toDos.reducer });
