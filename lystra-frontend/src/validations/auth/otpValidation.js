import * as yup from 'yup'

export const otpSchema = yup.object({
    otp: yup.string()
        .required('otp is required')
        .min(6, 'otp is 6 digits')
        .max(6, 'otp is 6 digits')
}).required()