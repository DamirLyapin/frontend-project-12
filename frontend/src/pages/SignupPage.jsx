import  * as yup from 'yup'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useTransition } from 'react'

const { t } = useTransition()

const schema = yup.object({
    username: yup
        .string()
        .min(3)
        .max(20)
        .required(),
    string:  yup
        .string()
        .min(6)
        .required(),
    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref('password')],
            'Пароли должны совпадать'
        )
        .required(),
})

export const SignupPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const error = useSelector(
    (state) => state.auth.error,
  );

  const handleSubmit = async (values) => {
    const result = await dispatch(
      signup({
        username: values.username,
        password: values.password,
      }),
    );

    if (signup.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div>
      <h1>{t('signup.title')}</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="username" />
          <ErrorMessage name="username" />

          <Field
            type="password"
            name="password"
          />
          <ErrorMessage name="password" />

          <Field
            type="password"
            name="confirmPassword"
          />
          <ErrorMessage name="confirmPassword" />

          {error && <div>{error}</div>}

          <button type="submit">
            {t('signup.submit')}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
