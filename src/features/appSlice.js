import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    roomId: null,
  },

  // Entering the database room and dispatching the captured data
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

// Exporting the created function above

export const { enterRoom } = appSlice.actions;

export const selectRoomId = (state, app) => state.app.roomId;

// const selectRoomId = (state, roomId) =>
//   state.posts.find(post => post.id === postId)

export default appSlice.reducer;
