import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useEffect, useRef } from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useProfanityFilter from '../../hooks/useProfanityFilter';
import { arrowRightSquare as arrowRightSquareIcon } from '../../assets/icons';
import { useCreateMessageMutation } from '../../slices/messagesSlice';
import { selectCurrentChannelId, selectCurrentUsername } from '../../slices/selectors';

const NewMessageForm = () => {
  const bodyInputRef = useRef(null);

  useEffect(() => {
    bodyInputRef.current?.focus();
  });

  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentUsername = useSelector(selectCurrentUsername);
  const { removeProfanity } = useProfanityFilter();
  const { t } = useTranslation();
  const [createMessage] = useCreateMessageMutation();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: object({
      body: string().trim().required(),
    }),
    onSubmit: async ({ body }, { resetForm }) => {
      try {
        await createMessage({
          body: removeProfanity(body),
          channelId: currentChannelId,
          username: currentUsername,
        });
        bodyInputRef.current?.focus();
        resetForm();
      } catch (error) {
        bodyInputRef.current?.select();
      }
    },
  });

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
