import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useProfanityFilter from '../../hooks/useProfanityFilter';
import modalFormValidationSchema from './validationSchema';
import { selectChannelWithActionId, selectChannelNames, selectChannelById } from '../../slices/selectors';
import { useUpdateChannelMutation } from '../../slices/channelsSlice';
import { hideModal } from '../../slices/userUiSlice';

const RenameChannelForm = () => {
  const dispatch = useDispatch();
  const nameInputRef = useRef();

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current?.select();
    }
  }, []);

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const channelWithActionId = useSelector(selectChannelWithActionId);
  const channelWithAction = useSelector((state) => selectChannelById(state, channelWithActionId));
  const channelNames = useSelector(selectChannelNames);
  const { removeProfanity } = useProfanityFilter();
  const { t } = useTranslation();
  const [updateChannel] = useUpdateChannelMutation();

  const formik = useFormik({
    initialValues: { name: channelWithAction.name },
    validationSchema: modalFormValidationSchema(channelNames),
    onSubmit: async ({ name }, { resetForm, setFieldError }) => {
      const sanitizedChannelName = removeProfanity(name.trim());

      try {
        await updateChannel({
          name: sanitizedChannelName,
          id: channelWithAction.id,
        }).unwrap();
        resetForm();
        handleHideModal();
        toast.success(t('toastMessages.channelRenamed'));
      } catch (error) {
        setFieldError('body', error);
        nameInputRef.current?.select();
        toast.error(t('toastMessages.failedToRenameChannel'));
      }
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-2" controlId="name">
        <Form.Label className="visually-hidden">
          {t('channelName')}
        </Form.Label>
        <Form.Control
          required
          name="name"
          type="text"
          disabled={formik.isSubmitting}
          value={formik.values.name}
          isInvalid={formik.touched.name && formik.errors.name}
          onChange={formik.handleChange}
          ref={nameInputRef}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name && t(formik.errors.name)}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex justify-content-end gap-2">
        <Button
          disabled={formik.isSubmitting}
          onClick={handleHideModal}
          variant="secondary"
        >
          {t('cancel')}
        </Button>
        <Button disabled={formik.isSubmitting} type="submit">
          {t('send')}
        </Button>
      </div>
    </Form>
  );
};

export default RenameChannelForm;
