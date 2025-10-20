import { Modal, Button, Input } from "antd";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductDetailSchema } from "@/validations/Ad/productDetailsValidation";

const ProductDetailModal = ({
  visible,
  onClose,
  setDetailData,
  detailsInputRef,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      inputs: [{ title: "", content: "" }],
    },
    resolver: yupResolver(ProductDetailSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inputs",
  });

  
  const handleFormSubmit = (data) => {

    const finalAns = data.inputs.reduce((acc, item) => {
      acc[item.title] = item.content;
      return acc;
    }, {});

    setDetailData(finalAns);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="Product Details"
      open={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} ref={detailsInputRef}>
        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <Controller
                  name={`inputs.${index}.title`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Title"
                      style={{ height: "40px" }}
                    />
                  )}
                />
              </div>

              <div style={{ flex: 1 }}>
                <Controller
                  name={`inputs.${index}.content`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Content"
                      style={{ height: "40px" }}
                    />
                  )}
                />
              </div>

              {fields.length > 1 && (
                <Button
                  danger
                  onClick={() => remove(index)}
                  style={{ height: "40px" }}
                >
                  Remove
                </Button>
              )}
            </div>

            <p className="text-red-600 text-xs font-semibold pt-1 ps-1 h-5 md:text-center">
              {errors.inputs?.[index]?.message || " "}
            </p>
          </div>
        ))}

        <Button
          type="dashed"
          onClick={() => append({ title: "", content: "" })}
          style={{ marginBottom: "16px" }}
        >
          Add Input
        </Button>

        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Submit
        </Button>
        
      </form>
    </Modal>
  );
};

export default ProductDetailModal;
