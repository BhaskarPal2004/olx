import * as yup from "yup";

export const editProfileValidation = yup.object({
    name: yup.string().optional().trim().min(3, "Name should contain minimum 3 characters"),
    phoneNumber: yup
        .string()
        .optional()
        .trim()
        .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),

})