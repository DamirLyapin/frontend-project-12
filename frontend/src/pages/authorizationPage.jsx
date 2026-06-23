import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../slices/authSlice';

import { useTranslation } from 'react-i18next';

export const AuthorizationPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(
    (state) => state.auth.error,
  );

  const loading = useSelector(
    (state) => state.auth.loading,
  );

  const handleSubmit = async (values) => {
    const result = await dispatch(login(values));

    if (login.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field
          name="username"
          type="text"
        />

        <Field
          name="password"
          type="password"
        />

        {error && (
          <div>{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {t('auth.login')}
        </button>

        <div>
          {t('auth.noAccount')}
          <Link to="/signup">
            {t('auth.signup')}
          </Link>
        </div>
      </Form>
    </Formik>
  );
};
