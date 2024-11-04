import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectCurrentUsername } from '../slices/authSlice';
import paths from './routePaths';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUsername);

  return currentUser
    ? children
    : <Navigate to={paths.loginPage} state={{ from: location }} />
};

export default PrivateRoute;
