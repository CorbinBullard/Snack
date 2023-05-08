const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";
const CREATE_CHANNEL = "channel/CREATE_CHANNEL";
const DELETE_CHANNEL = "channel/DELETE_CHANNEL";

export const allChannelsAction = (channels) => ({
  type: GET_ALL_CHANNELS,
  channels,
});

export const createChannelAction = (channel) => ({
  type: CREATE_CHANNEL,
  channel
})

const deleteChannelAction = channelId => ({
  type: DELETE_CHANNEL,
  channelId
})

//THUNK------------------------------

export const getAllChannelsThunk = () => async (dispatch) => {
  const res = await fetch("/api/channels");
  const channels = await res.json();
  console.log("ALL CHANNELS", channels)
  await dispatch(allChannelsAction(channels));
};

export const createChannelThunk = (channel) => async (dispatch) => {
  const { channelName, isDm, description, addUsers } = channel
  const res = await fetch("/api/channels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channelName,
      isDm,
      description,
      addUsers
    })
  })
  if (res.ok) {
    const newChannel = await res.json()
    dispatch(createChannelAction(newChannel))
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const deleteChannelThunk = channelId => async dispatch => {
  const res = await fetch(`/api/channels/${channelId}`, {
    method: "DELETE"
  })
  if (res.ok) {
    dispatch(deleteChannelAction(channelId))
  } else {
    const errors = await res.json();
    return errors;
  }
}

//REDUCER------------------------------

const initialState = { allChannels: {}, currentChannel: {} }

export default function reducer(state = initialState, action) {
  let newState = {};
  switch (action.type) {
    case GET_ALL_CHANNELS:
      action.channels.forEach((channel) => { (newState.allChannels.channel[channel.id] = channel) });
      return newState;
    case CREATE_CHANNEL:
      newState = { allChannels: { ...state.allChannels }, currentChannel: action.channel };
      newState.allChannels[action.channel.channel.id] = action.channel;
      return newState;
    case DELETE_CHANNEL:
      newState = {...state};
      delete newState.allChannels[action.channelId];
      newState.currentChannel = {};
      return newState;
    default:
      return state;
  }
};
