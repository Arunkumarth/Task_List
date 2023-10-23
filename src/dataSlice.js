import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataStart: (state)=> {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action)=> {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchDataError: (state, action) =>{
      state.isLoading = false;
      state.error = action.payload;
    },
    addData:(state)=>{
      state.isLoading = true;

    },
    editData:(state)=>{
      state.isLoading = true;

    },
    deleteData:(state)=>{
      state.isLoading = true;

    },
    addDataError: (state, action) =>{
      state.isLoading = false;
      state.error = action.payload;
    },
    editDataError: (state, action) =>{
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteDataError: (state, action) =>{
      state.isLoading = false;
      state.error = action.payload;
    },
    
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataError ,addDataError,editDataError,deleteDataError,addData,editData,deleteData} = dataSlice.actions;
export default dataSlice.reducer;