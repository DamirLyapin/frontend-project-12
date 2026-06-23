import { Link, useNavigate } from 'react-router-dom'
import { useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/authSlice'

export const Header = () => {
    const { t } = useTransition()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(
        (state) => state.auth.isAuth
    )

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <header>
            <Link to="/">{t('appName')}</Link>
            {isAuth && (
                <button type='button' onClick={handleLogout}>{t('auth.logout')}</button>
            )}
        </header>
    )
}
