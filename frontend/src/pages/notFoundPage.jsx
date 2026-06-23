import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <div className="text-center align-middle">
            <h1>{t('notFound.title')}</h1>
            <h3>{t('notFound.title')}</h3>
        </div>
    )
}
