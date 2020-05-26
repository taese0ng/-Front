import {configureStore, createSlice} from "@reduxjs/toolkit";

const toDos = createSlice({
  name: "toDosReducer",
  initialState: {
    location:[],
    // list: [],
    openCalendar: true,//false,
    tripDate: null,
    itineraryId : '',
  },
  reducers: {
    addLocation:(state, action) => {
      state.location.push({ text: action.payload, id: Date.now()});
    },
    setOpenCalendar:(state) =>{
      state.openCalendar = !state.openCalendar;
      console.log(state.openCalendar)
    },
    setTripDate:(state, action)=>{
      state.tripDate = action.payload;
    },
    setItineraryId:(state, action)=>{
      console.log(action.payload)
      state.itineraryId = action.payload;
    }
    // add: (state, action) => {
    //   state.list.push({ text: action.payload, id: Date.now() });
    // },
    // remove(state, action){
    //     for(var i = 0; i < state.list.length; i++){
    //         if(state.list[i].id === action.payload){
    //             state.list.splice(i,1);
    //         }
    //     }
    // },

    // remove: (state,action) => state.list.filter(toDo => toDo.id !== action.payload)
  },
});

export const {
    addLocation,
    setOpenCalendar,
    setTripDate,
    setItineraryId
    // add,
    // remove
} = toDos.actions;

export default configureStore({ reducer: toDos.reducer });