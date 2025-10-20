import { Modal, Input } from "antd";
import { useState } from "react";

const EmailInputModal = ({ visible, onClose, onSubmit, loading, title }) => {
  const [email, setEmail] = useState("");

  const handleOk = () => {
    if (!email) return;
    onSubmit(email);
  };

  return (
    <Modal
      title={title}
      open={visible}
      onOk={handleOk}
      confirmLoading={loading}
      onCancel={() => {
        setEmail("");
        onClose();
      }}
      okText="Submit"
    >
      <label className="block mb-2">Email Address</label>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onPressEnter={handleOk}
      />
    </Modal>
  );
};

export default EmailInputModal;
