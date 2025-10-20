import * as yup from "yup";

export const AddressSchema = yup.object({
  line1: yup.string().required("Line 1 is required").trim().min(3, 'line1 should contain 3 character'),
  line2: yup
    .string()
    .transform(value => (value === '' ? undefined : value))
    .notRequired()
    .min(3, 'Line 2 should contain at least 3 characters'),
  state: yup.string().required("State is required").trim(),
  city: yup.string().required("City is required").trim(),
  country: yup.string().required("Country is required").trim(),
  pinCode: yup
    .number()
    .typeError("Pin code is required")
    .min(100000, "Pin code is not valid")
    .max(999999, "Pin code is not valid")
    .required("Enter valid pin"),
  landMark: yup.string().optional().trim(),
});
