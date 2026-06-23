import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

export const NotFoundPage = () => {
    return (
        <div className="text-center align-middle">
            <h1>{t('notFound.title')}</h1>
            <h3>{t('notFound.title')}</h3>
        </div>
    )
}
