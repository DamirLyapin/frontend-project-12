import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChatData = createAsyncThunk(
  'chat/fetchChatData',
  async () => {
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const [channelsResponse, messagesResponse] = await Promise.all([
      axios.get('/api/v1/channels', { headers }),
      axios.get('/api/v1/messages', { headers }),
    ]);

    return {
      channels: channelsResponse.data,
      messages: messagesResponse.data,
    };
  },
);

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
  loading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,

  reducers: {
    setCurrentChannel(state, action) {
      state.currentChannelId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchChatData.fulfilled, (state, action) => {
        state.loading = false;

        state.channels = action.payload.channels;
        state.messages = action.payload.messages;

        if (action.payload.channels.length > 0) {
          state.currentChannelId =
            action.payload.channels[0].id;
        }
      });
  },
});

export const { setCurrentChannel } =
  chatSlice.actions;

export default chatSlice.reducer;
