import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

export const AuthorizationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error } = useSelector((state) => state.auth);

    const handleSubmit = async (values) => {
        const resultAction = await dispatch(login(values));

        if (login.fulfilled.match(resultAction)) {
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
            placeholder="Username"
            />

            <Field
            name="password"
            type="password"
            placeholder="Password"
            />

            {error && (
            <div className="text-danger">
                {error}
            </div>
            )}

            <button type="submit">
            Войти
            </button>
        </Form>
        </Formik>
    );
};
