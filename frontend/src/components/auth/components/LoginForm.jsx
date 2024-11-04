import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Col, Form } from 'react-bootstrap';

import ROUTE_PATHS from '../../../routes/routePaths';
import { loginFormValidationSchema } from '../../../schemas';
import { login } from '../../../slices/authSlice';

const LoginForm = () => {
  const usernameInputRef = useRef(null);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginFormValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        await dispatch(login(values)).unwrap();
        navigate(ROUTE_PATHS.mainPage);
      } catch (error) {
        usernameInputRef.current?.select();
        setErrors({
          username: error,
          password: error,
        });
      }
    },
  });

  const { t } = useTranslation();

  return (
    <Col as={Form} xs={12} md={6} onSubmit={formik.handleSubmit} noValidate>
      <h1 className="text-center mb-4">
        {t('login')}
      </h1>
      <Form.FloatingLabel
        label={t('yourNickname')}
        className="mb-3"
        controlId="username"
      >
        <Form.Control
          required
          name="username"
          type="text"
          autoComplete="username"
          ref={usernameInputRef}
          placeholder={t('yourNickname')}
          value={formik.values.username}
          onChange={formik.handleChange}
          isInvalid={formik.touched.username && formik.errors.username}
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.username && t(formik.errors.username)}
        </Form.Control.Feedback>
      </Form.FloatingLabel>
      <Form.FloatingLabel
        label={t('password')}
        controlId="password"
        className="mb-3"
      >
        <Form.Control
          required
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder={t('password')}
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={formik.touched.password && formik.errors.password}
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password && t(formik.errors.password)}
        </Form.Control.Feedback>
      </Form.FloatingLabel>
      <Button
        className="w-100 mb-3"
        type="submit"
        variant="outline-primary"
        disabled={formik.isSubmitting}
      >
        {t('login')}
      </Button>
    </Col>
  );
};

export default LoginForm;
