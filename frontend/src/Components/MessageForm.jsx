import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { sendMessage } from '../slices/chatSlice';

import { useTranslation } from 'react-i18next';

export const MessageForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannelId = useSelector(
    (state) => state.chat.currentChannelId,
  );

  const sendLoading = useSelector(
    (state) => state.chat.sendLoading,
  );

  const username = localStorage.getItem('username');
  const cleanMessage = leoProfanity.clean(values.body);
  const handleSubmit = async (
    values,
    { resetForm },
  ) => {
    await dispatch(
      sendMessage({
        body: cleanMessage,
        channelId: currentChannelId,
        username,
      }),
    );

    resetForm();
  };

  return (
    <Formik
      initialValues={{
        body: '',
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field
          name="body"
          type="text"
          placeholder={t('messages.placeholder')}
        />

        <button
          type="submit"
          disabled={sendLoading}
        >
          {t('messages.send')}
        </button>
      </Form>
    </Formik>
  );
};
