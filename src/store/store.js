import {configureStore, createSlice} from "@reduxjs/toolkit";

const toDos = createSlice({
  name: "toDosReducer",
  initialState: {
    location:[],
    // list: [],
    menuOpen: false,
  },
  reducers: {
    addLocation:(state, action) => {
      state.location.push({ text: action.payload, id: Date.now()});
    },
    setMenuOpen:(state) =>{
      state.menuOpen = !state.menuOpen
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
    setMenuOpen
    // add,
    // remove
} = toDos.actions;

export default configureStore({ reducer: toDos.reducer });