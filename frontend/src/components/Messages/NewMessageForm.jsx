import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useEffect, useRef } from 'react';
import { Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { arrowRightSquare as arrowRightSquareIcon } from '../../assets/icons';
import { selectCurrentUsername } from '../../slices/authSlice';
import { useCreateMessageMutation } from '../../slices/messagesSlice';
import { useProfanityFilter } from '../../contexts/ProfanityFilterProvider';
import { selectCurrentChannelId } from '../../slices/selectors';

const NewMessageForm = () => {
  const bodyInputRef = useRef(null);

  useEffect(() => {
    bodyInputRef.current?.focus();
  });

  const [createMessage, {
    isError,
    isSuccess,
  }] = useCreateMessageMutation();
  const { removeProfanity } = useProfanityFilter();

  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentUsername = useSelector(selectCurrentUsername);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: object({
      body: string().trim().required(),
    }),
    onSubmit: ({ body }) => {
      const filteredBody = removeProfanity(body);
      createMessage({
        body: filteredBody,
        channelId: currentChannelId,
        username: currentUsername,
      });
    },
  });

  useEffect(() => {
    if (isError) {
      bodyInputRef.current?.select();
      formik.setSubmitting(false);
    }
    if (isSuccess) {
      formik.resetForm();
      formik.setSubmitting(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const { t } = useTranslation();

  return (
    <Form
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <InputGroup hasValidation>
        <Form.Control
          required
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          placeholder={`${t('enterMessage')}...`}
          aria-label={t('newMessage')}
          ref={bodyInputRef}
          className="border-0 p-0 ps-2"
        />
        <Form.Control.Feedback>
          {formik.errors.body && t(formik.errors.body)}
        </Form.Control.Feedback>
        <ButtonGroup
          as={Button}
          type="submit"
          variant="outline-secondary"
          disabled={formik.isSubmitting
            || formik.errors.body
            || !formik.values.body}
          vertical
        >
          {arrowRightSquareIcon}
          <span className="visually-hidden">
            {t('send')}
          </span>
        </ButtonGroup>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
