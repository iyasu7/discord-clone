import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelId: null,
  channelName: null,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelInfo: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
  },
});

export const { setChannelInfo } = channelSlice.actions;

export const selectChannelId = (state) => state.channels.channelId;
export const selectChannelName = (state) => state.channels.channelName;

export default channelSlice.reducer;