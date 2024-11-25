import { object, string } from 'yup';

const modalFormValidationSchema = (channelNames) => object({
  name: string()
    .trim()
    .required()
    .min(3, 'common.requiredLength')
    .max(20, 'common.requiredLength')
    .notOneOf(channelNames),
});

export default modalFormValidationSchema;
