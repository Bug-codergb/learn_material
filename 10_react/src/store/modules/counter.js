import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
export const fetctHome = createAsyncThunk("fetchHome", async () => {
  const res = [];
  return res;
})
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    name: "gblina",
    age:110
  },
  reducers: {
    addNumber(state,action) {
      state.age = action.payload
    },
    subNumber(state,action) {
      state.name = action.payload
    }
  },
  extraReducers: {
    [fetctHome.pending](state,action) {
      
    },
    [fetctHome.fulfilled](state,action) {
      
    },
    [fetctHome.rejected](state,action) {
      
    }
  }
})
export const { addNumber,subNumber} = counterSlice.actions;
export default counterSlice.reducer;