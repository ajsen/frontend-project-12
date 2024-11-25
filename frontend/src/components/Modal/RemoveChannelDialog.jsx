import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { hideModal } from '../../slices/userUiSlice';
import { useDeleteChannelMutation } from '../../slices/channelsSlice';
import { selectChannelWithActionId } from '../../slices/selectors';

const RemoveChannelDialog = () => {
  const dispatch = useDispatch();
  const channelWithActionId = useSelector(selectChannelWithActionId);
  const { t } = useTranslation();
  const [deleteChannel, { isLoading }] = useDeleteChannelMutation();

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const handleRemoveChannel = async () => {
    try {
      await deleteChannel(channelWithActionId).unwrap();
      handleHideModal();
      toast.success(t('toastMessages.channelRemoved'));
    } catch (error) {
      toast.error(t('toastMessages.failedToRemoveChannel'));
    }
  };

  return (
    <>
      <p>{`${t('remove')}?`}</p>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2"
          variant="secondary"
          disabled={isLoading}
          onClick={handleHideModal}
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
