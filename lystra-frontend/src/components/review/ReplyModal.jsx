import { Modal, Input, Form } from "antd";
import { useState } from "react";
import useAxiosInstance from "@/hooks/useAxiosInstance"; 
import toast from "react-hot-toast";

const ReplyModal = ({ isOpen, onClose, reviewId }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { reviewApi } = useAxiosInstance(); 

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const res = await reviewApi.post(`/reply/${reviewId}`, {
        content: values.message,
      });

      if(res.success){
        toast.success("Reply sent successfully!");
        onClose();
        form.resetFields();
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to send reply.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText="Send Reply"
      title="Reply to Review"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Message is required" }]}
        >
          <Input.TextArea rows={4} placeholder="Write your reply here..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReplyModal;
