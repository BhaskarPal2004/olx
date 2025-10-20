import * as yup from 'yup'

export const loginSchema = yup.object({
    email: yup.string()
        .required('email is required')
        .email('Invalid email format'),

    password: yup.string()
        .required('password is required')
        .min(8),
}).required()