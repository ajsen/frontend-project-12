import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Col, Form } from 'react-bootstrap';

import ROUTE_PATHS from '../../../routes/routePaths';
import { signupFormValidationSchema } from '../../../schemas';
import { signup } from '../../../slices/authSlice';

const SignupForm = () => {
  const usernameInputRef = useRef(null);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupFormValidationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        await dispatch(signup(values)).unwrap();
        navigate(ROUTE_PATHS.mainPage);
      } catch (error) {
        usernameInputRef.current?.select();
        setErrors({
          username: error,
          password: error,
          confirmPassword: error,
        });
      }
    },
  });

  return (
    <Col as={Form} xs={12} md={6} onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">
        {t('registration')}
      </h1>
      <Form.FloatingLabel
        className="mb-3"
        controlId="username"
        label={t('username')}
      >
        <Form.Control
          required
          name="username"
          type="text"
          autoComplete="username"
          ref={usernameInputRef}
          placeholder={t('common.usernameRequiredLength')}
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
          autoComplete="new-password"
          placeholder={t('atLeastSixSymbols')}
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={formik.touched.password && formik.errors.password}
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password && t(formik.errors.password)}
        </Form.Control.Feedback>
      </Form.FloatingLabel>
      <Form.FloatingLabel
        controlId="confirmPassword"
        label={t('confirmPassword')}
        className="mb-3"
      >
        <Form.Control
          required
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          autoComplete="new-password"
          placeholder={t('common.passwordsMustBeEqual')}
          onChange={formik.handleChange}
          isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
          disabled={formik.isSubmitting}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.confirmPassword && t(formik.errors.confirmPassword)}
        </Form.Control.Feedback>
      </Form.FloatingLabel>
      <Button
        disabled={formik.isSubmitting}
        className="w-100 mb-3"
        type="submit"
        variant="outline-primary"
      >
        {t('signup')}
      </Button>
    </Col>
  );
};

export default SignupForm;
