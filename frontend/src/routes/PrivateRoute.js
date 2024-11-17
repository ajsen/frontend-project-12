import { useSelector } from 'react-redux';
import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import { selectCurrentUsername } from '../slices/selectors';
import ROUTE_PATHS from './routePaths';

const PrivateRoute = () => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUsername);

  return currentUser
    ? <Outlet />
    : <Navigate to={ROUTE_PATHS.getLogin()} state={{ from: location }} />;
};

export default PrivateRoute;
