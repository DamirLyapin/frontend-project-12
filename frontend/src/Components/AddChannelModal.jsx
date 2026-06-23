import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {
  addChannel,
  setCurrentChannel,
} from '../slices/chatSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  closeModal,
} from '../slices/modalSlice';
import leoProfanity from 'leo-profanity';


export const AddChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector(
    (state) => state.chat.channels,
  );

  const channelNames = channels.map(
    (channel) => channel.name,
  );

  const schema = yup.object({
    name: yup
      .string()
      .min(3)
      .max(20)
      .notOneOf(channelNames)
      .required(),
  });
  const cleanName = leoProfanity.clean(values.name)
  const handleSubmit = async (
    values,
    { setSubmitting }
  ) => {
    try {
      const channel = await dispatch(
        addChannel(cleanName),
      ).unwrap();

      dispatch(
        setCurrentChannel(channel.id),
      );

      toast.success(
        t('toast.channelCreated'),
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

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
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
          {t('channels.add')}
        </button>
      </Form>
    </Formik>
  );
};