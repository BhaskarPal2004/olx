import * as yup from "yup";

export const UpdateAdSchema = yup.object({
    name: yup
        .string()
        .optional()
        .trim(),
    price: yup
        .number()
        .typeError("Price should be a number")
        .positive("Price should be a positive number")
        .optional(),


    category: yup.string().optional(),
    condition: yup.string().optional(),
    description: yup
        .string()
        .optional()
        .trim(),
    files: yup
        .array()
        .of(yup.mixed().nullable())
        .test(
            "has-at-least-one",
            "At least one image is required",
            (files) => Array.isArray(files) && files.some((file) => !!file)
        ),
});
