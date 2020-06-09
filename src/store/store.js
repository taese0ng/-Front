import {configureStore, createSlice} from "@reduxjs/toolkit";

const toDos = createSlice({
  name: "toDosReducer",
  initialState: {
    // list: [],
    schedule:[],
    latlng:[],
    tripDate: null,
    itineraryId : '',
  },
  reducers: {
    setTripDate:(state, action)=>{
      state.tripDate = action.payload;
    },
    setItineraryId:(state, action)=>{
      console.log(action.payload)
      state.itineraryId = action.payload;
    },
    setSchedule:(state, action)=>{
      state.schedule=[...state.schedule,action.payload]
      //push({text : action.payload});
      // console.log("스토어",action.payload)
      // console.log("스토어2",state.schedule)
    },
    initSchedule:(state)=>{
      state.schedule=[];
    },
    setLatlng:(state, action)=>{
      state.latlng=[...state.latlng,action.payload]
      //push({text : action.payload});
      // console.log("스토어",action.payload)
      console.log("저;장",state.latlng)
    },
    initLatlng:(state)=>{
      state.latlng=[];
      console.log("초기화",state.latlng);

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
    setTripDate,
    setItineraryId,
    setSchedule,
    initSchedule,
    setLatlng,
    initLatlng
    // add,
    // remove
} = toDos.actions;

export default configureStore({ reducer: toDos.reducer });
