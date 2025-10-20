import * as yup from "yup";

const ReviewSchema = yup
  .object({
    productRating: yup
      .number()
      .min(1, "Please rate the product")
      .required("Product rating is required"),

    sellerRating: yup
      .number()
      .min(1, "Please rate the seller")
      .required("Seller rating is required"),

    feedbackTitle: yup.string().trim().optional(),

    feedbackComment: yup.string().trim().optional(),
  })
  .test("subject-or-comment", null, function (values) {
    const { feedbackTitle, feedbackComment } = values || {};

    const hasSubject = !!feedbackTitle;
    const hasComment = !!feedbackComment;

    if (hasSubject && !hasComment) {
      return this.createError({
        path: "feedbackComment",
        message: "Comment is required when subject is provided",
      });
    }

    if (hasComment && !hasSubject) {
      return this.createError({
        path: "feedbackTitle",
        message: "Subject is required when comment is provided",
      });
    }

    return true;
  });

export default ReviewSchema;
