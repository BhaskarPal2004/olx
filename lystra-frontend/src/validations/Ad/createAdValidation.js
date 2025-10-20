import * as yup from "yup";

export const CreateAdSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .min(3, "Minimum 3 characters"),
  price: yup
    .number()
    .typeError("Price is required")
    .positive("Must be a positive number"),
  category: yup.string().required("Category is required"),
  condition: yup.string().required("Condition is required"),
  description: yup
    .string()
    .trim()
    .min(3, "Minimum 3 characters")
    .required("Description is required"),
  files: yup
    .array()
    .of(yup.mixed().nullable())
    .test(
      "has-at-least-one",
      "At least one image is required",
      (files) => Array.isArray(files) && files.some((file) => !!file)
    ),
});
