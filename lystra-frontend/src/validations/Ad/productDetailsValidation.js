import * as yup from "yup";

export const ProductDetailSchema = yup.object({
  inputs: yup.array().of(
    yup
      .object()
      .shape({
        title: yup.string().trim().nullable(),
        content: yup.string().trim().nullable(),
      })
      .test(
        "title-and-content",
        "Both title and content are required if one is provided",
        function (value) {
          const { title, content } = value || {};
          const hasTitle = !!title?.trim();
          const hasContent = !!content?.trim();

          if ((hasTitle && !hasContent) || (!hasTitle && hasContent)) {
            return this.createError({
              path: this.path,
              message: "Both title and content are required if one is provided",
            });
          }

          return true;
        }
      )
  ),
});
