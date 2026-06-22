import { Formik, Form, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../slices/authSlice';

export const AuthorizationPage = () => {
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
          Войти
        </button>

        <div>
          Нет аккаунта?{' '}
          <Link to="/signup">
            Регистрация
          </Link>
        </div>
      </Form>
    </Formik>
  );
};
