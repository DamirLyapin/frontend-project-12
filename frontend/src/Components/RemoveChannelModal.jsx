import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { removeChannel } from '../slices/chatSlice';

import {
  closeModal,
} from '../slices/modalSlice';

export const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channelId = useSelector(
    (state) => state.modal.channelId,
  );

  const handleRemove = async () => {
    try {
      await dispatch(
        removeChannel(channelId),
      ).unwrap();

      toast.success(
        t('toast.channelRemoved'),
      );

      dispatch(closeModal());
    } catch (error) {
      toast.error(
        t('toast.networkError'),
      );
    }
  };

  return (
    <div>
      <p>
        {t('channels.confirmRemove')}
      </p>

      <button
        type="button"
        onClick={handleRemove}
      >
        {t('channels.remove')}
      </button>

      <button
        type="button"
        onClick={() =>
          dispatch(closeModal())
        }
      >
        {t('common.cancel')}
      </button>
    </div>
  );
};
