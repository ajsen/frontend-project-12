import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { logout, selectIsLoggedIn } from '../../slices/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  };

  const isLoggedIn = useSelector(selectIsLoggedIn);;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Button onClick={handleLogout}>
      Выйти
    </Button>
  );
};

export default LogoutButton;
