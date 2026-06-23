import i18n from 'i18next'
import { initReactI18next, Translation } from 'react-i18next'

const resources = {
    ru: {
        translation: {
            appName: 'Hexlet Chat',

            auth: {
                login: 'Войти',
                logout: "Выйти",
                signup: 'Регистрация',
                noAccount: 'Нет аккаунта?',
                username: 'Ваш ник',
                password: 'Пароль',
            },

            signup: {
                title: 'Регистрация',
                confirmPassword: 'Подтвердите пароль',
                submit: 'Зарегистрироваться',
            },
            errors: {
                auth: 'Неверные имя пользователя или пароль',
                userExists: 'Такой пользователь уже существует',
                required: 'Обязательное поле',
            },

            channels: {
                add: 'Добавить канал',
                remove: 'Удалить',
                rename: 'Переименовать',
            },

            messages: {
                send: 'Отправить',
                placeholder: 'Введите сообщение...',
            },

            notFound: {
                title: '404',
                text: 'Страница не найдена',
            },
        },
    },
};

i18n.
    use(initReactI18next)
    .init({
        resources,
        lng: 'ru',
        fallbackLng: 'ru',
        interpolation: {
 
            escapeValue: false
        }
    })

export default i18n
