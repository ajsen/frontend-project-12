import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import { logout } from '../../slices/authSlice';
import { selectCurrentUsername } from '../../slices/selectors';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const currentUsername = useSelector(selectCurrentUsername);
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!currentUsername) {
    return null;
  }

  return (
    <Button onClick={handleLogout}>
      {t('logout')}
    </Button>
  );
};

export default LogoutButton;
