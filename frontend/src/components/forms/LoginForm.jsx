import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import paths from '../../routePaths';
import { login } from '../../slices/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameInputRef = useRef();

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await dispatch(login(values)).unwrap();
        resetForm();
        navigate(paths.mainPage);
      } catch (error) {
        usernameInputRef.current.select();
      }
    },
  });

  const {
    values: { username, password },
    isSubmitting,
    handleSubmit,
    handleChange,
  } = formik;

  return (
    <Col as={Form} xs={12} md={6} onSubmit={handleSubmit}>
      <h1 className="text-center mb-4">
        Войти
      </h1>
      <Form.FloatingLabel
        className="mb-3"
        controlId="username"
        label="Ваш ник"
      >
        <Form.Control
          name="username"
          type="text"
          autoComplete="off"
          placeholder="Ваш ник"
          ref={usernameInputRef}
          value={username}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </Form.FloatingLabel>
      <Form.FloatingLabel
        controlId="password"
        label="Пароль"
        className="mb-3"
      >
        <Form.Control
          name="password"
          type="password"
          placeholder="Пароль"
          autoComplete="off"
          value={password}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </Form.FloatingLabel>
      <Button
        className="w-100 mb-3"
        type="submit"
        variant="outline-primary"
        disabled={isSubmitting}
      >
        Войти
      </Button>
    </Col>
  );
};

export default LoginForm;
