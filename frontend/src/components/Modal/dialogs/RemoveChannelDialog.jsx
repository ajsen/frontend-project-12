import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useModal } from '../../../contexts/ModalProvider';
import { useDeleteChannelMutation } from '../../../slices/channelsSlice';
import { selectChannelWithActionId } from '../../../slices/selectors';

const RemoveChannelDialog = () => {
  const [deleteChannel, {
    isLoading,
    isSuccess,
  }] = useDeleteChannelMutation();
  const channelWithActionId = useSelector(selectChannelWithActionId);
  const { hideModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess) {
      hideModal();
      toast.success(t('toastMessages.channelRemoved'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleRemoveChannel = () => {
    deleteChannel(channelWithActionId);
  };

  return (
    <>
      <p>{`${t('remove')}?`}</p>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2"
          variant="secondary"
          disabled={isLoading}
          onClick={hideModal}
        >
          {t('cancel')}
        </Button>
        <Button
          type="submit"
          variant="danger"
          disabled={isLoading}
          onClick={handleRemoveChannel}
        >
          {t('remove')}
        </Button>
      </div>
    </>
  );
};

export default RemoveChannelDialog;
