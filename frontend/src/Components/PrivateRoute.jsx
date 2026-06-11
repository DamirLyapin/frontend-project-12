import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return isAuth
    ? children
    : <Navigate to="/login" replace />;
};
