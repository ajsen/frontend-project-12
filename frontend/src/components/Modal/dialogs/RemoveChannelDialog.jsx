import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import useModal from '../../../hooks/useModal';
import { useDeleteChannelMutation } from '../../../slices/channelsSlice';
import { selectChannelWithActionId } from '../../../slices/selectors';

const RemoveChannelDialog = () => {
  const channelWithActionId = useSelector(selectChannelWithActionId);
  const { hideModal } = useModal();
  const { t } = useTranslation();
  const [deleteChannel, { isLoading }] = useDeleteChannelMutation();

  const handleRemoveChannel = async () => {
    await deleteChannel(channelWithActionId);
    hideModal();
    toast.success(t('toastMessages.channelRemoved'));
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
