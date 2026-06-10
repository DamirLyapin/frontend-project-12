import { Formik, Form, Field } from 'formik'

export const AuthorizationForm = () => {
    return (
        <Formik
            initialValues={{ name: '', password: '' }}
        >
            <Form>
                <Field type="name" name="name"/>
                <Field type="password" name="password"/>
                <button type='submit'>Войти</button>
            </Form>
        </Formik>
    )
}