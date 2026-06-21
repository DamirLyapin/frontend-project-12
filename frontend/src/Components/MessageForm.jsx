import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { sendMessage } from '../slices/chatSlice';

export const MessageForm = () => {
  const dispatch = useDispatch();

  const currentChannelId = useSelector(
    (state) => state.chat.currentChannelId,
  );

  const sendLoading = useSelector(
    (state) => state.chat.sendLoading,
  );

  const username = localStorage.getItem('username');

  const handleSubmit = async (
    values,
    { resetForm },
  ) => {
    await dispatch(
      sendMessage({
        body: values.body,
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
          placeholder="Введите сообщение..."
        />

        <button
          type="submit"
          disabled={sendLoading}
        >
          Отправить
        </button>
      </Form>
    </Formik>
  );
};
