import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { renameChannel } from '../slices/chatSlice';

import {
  closeModal,
} from '../slices/modalSlice';

export const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channelId = useSelector(
    (state) => state.modal.channelId,
  );

  const channels = useSelector(
    (state) => state.chat.channels,
  );

  const channel = channels.find(
    (item) => item.id === channelId,
  );

  const channelNames = channels
    .map((item) => item.name)
    .filter((name) => name !== channel?.name);

  const schema = yup.object({
    name: yup
      .string()
      .min(3)
      .max(20)
      .notOneOf(channelNames)
      .required(),
  });

  const handleSubmit = async (
    values,
    { setSubmitting }
  ) => {
    try {
      await dispatch(
        renameChannel({
          id: channelId,
          name: values.name,
        }),
      ).unwrap();

      toast.success(
        t('toast.channelRenamed'),
      );

      dispatch(closeModal());
    } catch (error) {
      toast.error(
        t('toast.networkError'),
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!channel) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        name: channel.name,
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form>
        <Field
          name="name"
          type="text"
        />

        <ErrorMessage
          name="name"
          component="div"
        />

        <button type="submit">
          {t('channels.rename')}
        </button>
      </Form>
    </Formik>
  );
};
