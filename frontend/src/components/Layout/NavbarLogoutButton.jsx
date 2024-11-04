import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';

import { logout, selectCurrentUsername } from '../../slices/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const currentUsername = useSelector(selectCurrentUsername);

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
