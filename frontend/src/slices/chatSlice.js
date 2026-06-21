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

export const addChannel = createAsyncThunk(
  'chat/addChannel',
  async (name) => {
    const token = localStorage.getItem('token')

    const response = await axios.post(
      'api/v1/channels',
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  }
)

export const removeChannel = createAsyncThunk(
  'chat/removeChannel',
  async (id) => {
    const token = localStorage.getItem('token')

    const response = await axios.delete(
      `api/v1/channels/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return id
  }
)

export const renameChannel = createAsyncThunk(
  'chat/renameChannel',
  async ({ id, name}) => {
    const token = localStorage.getItem('token')

    const response = await axios.patch(
      `api/v1/channels/${id}`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  }
)



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
    addMessage(state, action) {
        state.messages.push(action.payload)
    },
    addChannelSocket(state, action) {
      state.channels.push(action.payload)
    },
    removeChannelSocket(state, action) {
      state.channels = state.channels.filter(
        (channel) => channel.id !== action.payload
      )
      state.messages = state.messages.filter(
        (message) => message.channelId !== action.payload
      )
      if (state.currentChannelId === action.payload) {
        state.currentChannelId = state.channels[0]?.id
      }
    },
    renameChannelSocket(state, action) {
      const channel = state.channels.find(
        (channel) => channel.id === action.payload.id
      )
      if (channel) {
        channel.name = action.payload.name
      }
    }

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

export const { setCurrentChannel, addMessage, addChannelSocket, removeChannelSocket, renameChannelSocket } =
  chatSlice.actions;

export default chatSlice.reducer;
