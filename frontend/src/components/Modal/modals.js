import NewChannelForm from './NewChannelForm';
import RemoveChannelDialog from './RemoveChannelDialog';
import RenameChannelForm from './RenameChannelForm';

const modals = {
  addChannel: { title: 'addChannel', body: <NewChannelForm /> },
  removeChannel: { title: 'removeChannel', body: <RemoveChannelDialog /> },
  renameChannel: { title: 'renameChannel', body: <RenameChannelForm /> },
};

export default modals;
