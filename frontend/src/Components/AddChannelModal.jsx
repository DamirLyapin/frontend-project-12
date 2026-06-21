import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {
  addChannel,
  setCurrentChannel,
} from '../slices/chatSlice';

import {
  closeModal,
} from '../slices/modalSlice';

const schema = yup.object({
    name: yup
        .string()
        .min(3)
        .max(20)
        .notOneOf(channelNames)
        .required()
})

const handleSubmit = async (
  values,
  { setSubmitting }
) => {
  try {
    const result = await dispatch(
      addChannel(values.name)
    ).unwrap();

    dispatch(setCurrentChannel(result.id));
    dispatch(closeModal());
  } catch (error) {
    console.error(error);
  } finally {
    setSubmitting(false);
  }
};

export const AddChannelModal = () => {
    return (
        <Formik
            initialValues={{
                name: '',
            }}
            validationSchema={schema}
            onSubmit={handleSubmit}>
                <Form>
                    <Field name="name" />

                    <ErrorMessage name='name' />
                    <button type='submit'>Отправить</button>
                </Form>
            </Formik>
    )
}
