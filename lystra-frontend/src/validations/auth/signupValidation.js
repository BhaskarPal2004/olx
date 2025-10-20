import * as yup from 'yup'

export const signupSchema = yup.object({
    name: yup
        .string()
        .required('full name is required'),

    email: yup.string()
        .required('email is required')
        .email('Invalid email format'),

    phoneNumber: yup
        .number()
        .required('phone number is required')
        .typeError('phone number must be digits')
        .positive('phone number must be positive')
        .integer('phone number must be an integer')
        .min(1000000000, 'phone number must be at least 10 digits')
        .max(9999999999, 'phone number must be at most 10 digits'),

    password: yup.string()
        .required('password is required')
        .min(8),

    confirmPassword: yup.string()
        .required('confirm password is required')
        .min(8, 'confirm password must be at least 8 characters'),

}).required()