import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useModal from '../../../hooks/useModal';
import useProfanityFilter from '../../../hooks/useProfanityFilter';
import { useCreateChannelMutation } from '../../../slices/channelsSlice';
import { selectChannelNames, selectCurrentUsername } from '../../../slices/selectors';
import { modalFormValidationSchema } from '../../../schemas';

const NewChannelForm = () => {
  const nameInputRef = useRef();

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const channelNames = useSelector(selectChannelNames);
  const currentUsername = useSelector(selectCurrentUsername);
  const { removeProfanity } = useProfanityFilter();
  const { hideModal } = useModal();
  const { t } = useTranslation();
  const [createChannel] = useCreateChannelMutation();

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: modalFormValidationSchema(channelNames),
    onSubmit: async ({ name }, { resetForm, setFieldError }) => {
      const sanitizedChannelName = removeProfanity(name.trim());

      try {
        await createChannel({
          name: sanitizedChannelName,
          creator: currentUsername,
        }).unwrap();
        resetForm();
        hideModal();
        toast.success(t('toastMessages.channelCreated'));
      } catch (error) {
        setFieldError('name', error);
        nameInputRef.current?.select();
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
          onClick={hideModal}
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

export default NewChannelForm;
