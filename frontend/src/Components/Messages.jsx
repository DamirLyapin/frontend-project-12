import { useSelector } from 'react-redux';

export const Messages = () => {
  const messages = useSelector(
    (state) => state.chat.messages,
  );

  const currentChannelId = useSelector(
    (state) => state.chat.currentChannelId,
  );

  const currentMessages = messages.filter(
    (message) =>
      String(message.channelId)
      === String(currentChannelId),
  );

  return (
    <div>
      {currentMessages.map((message) => (
        <div key={message.id}>
          <b>{message.username}</b>
          {' : '}
          {message.body}
        </div>
      ))}
    </div>
  );
};
