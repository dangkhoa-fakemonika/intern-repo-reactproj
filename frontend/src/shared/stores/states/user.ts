import {createSlice} from "@reduxjs/toolkit";
import type {User} from "@/shared/types/type";

interface UserState {
  access_token? : string,
  refresh_token? : string,
  max_age? : number,
  data? : User
}

const initialState : UserState = {
  access_token : undefined,
  refresh_token : undefined,
  max_age : undefined,
  data : undefined
}

const userSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
    updateAccessToken : (state, action) => {
      state.access_token = action.payload;
    },
    updateRefreshToken : (state, action) => {
      state.refresh_token = action.payload.refresh_token;
      state.max_age = action.payload.max_age;
    },
    updateUser : (state, action) => {
      state.data = action.payload
    }
  }
});

export const {updateAccessToken, updateRefreshToken, updateUser} = userSlice.actions;
export default userSlice.reducer;