import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { fetchChatData } from '../slices/chatSlice';

import { Channels } from '../Components/Channels';
import { Messages } from '../Components/Messages';
import { MessageForm } from '../Components/MessageForm';

export const MainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const loading = useSelector(
    (state) => state.chat.loading,
  );

  const channels = useSelector(
    (state) => state.chat.channels,
  );

  const currentChannelId = useSelector(
    (state) => state.chat.currentChannelId,
  );

  const currentChannel = channels.find(
    (channel) => channel.id === currentChannelId,
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(
          fetchChatData(),
        ).unwrap();
      } catch (error) {
        toast.error(
          t('toast.loadError'),
        );
      }
    };

    loadData();
  }, [dispatch, t]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <div className="row">

        <div className="col-3 border-end">
          <Channels />
        </div>

        <div className="col">

          <div className="border-bottom mb-3 pb-2">
            <h3>
              # {currentChannel?.name}
            </h3>
          </div>

          <Messages />

          <MessageForm />

        </div>

      </div>
    </div>
  );
};
