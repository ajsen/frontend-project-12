import { useSelector } from 'react-redux';
import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import routePaths from '../routes/routePaths';
import { selectCurrentUsername } from '../slices/selectors';

const PrivateRoute = () => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUsername);

  return currentUser
    ? <Outlet />
    : <Navigate to={routePaths.getLogin()} state={{ from: location }} />;
};

export default PrivateRoute;
