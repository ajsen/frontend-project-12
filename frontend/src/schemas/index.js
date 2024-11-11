import { object, string } from 'yup';

export const loginFormValidationSchema = object({
  username: string().trim().required(),
  password: string().trim().required(),
});

export const signupFormValidationSchema = object({
  username: string()
    .trim()
    .required()
    .min(3, 'common.usernameRequiredLength')
    .max(20, 'common.usernameRequiredLength'),
  password: string()
    .trim()
    .required()
    .min(6, 'common.passwordRequiredLength')
    .max(20, 'common.passwordRequiredLength'),
  confirmPassword: string()
    .trim()
    .required()
    .test({
      name: 'confirmPassword',
      message: 'common.passwordsMustBeEqual',
      test: (value, context) => value === context.parent.password,
    }),
});

export const modalFormValidationSchema = (channelNames) => object({
  name: string()
    .trim()
    .required()
    .min(3, 'common.requiredLength')
    .max(20, 'common.requiredLength')
    .notOneOf(channelNames),
});
