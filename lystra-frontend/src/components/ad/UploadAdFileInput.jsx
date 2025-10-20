import { Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export const UploadAdFileInput = ({ fileList, setFileList }) => {
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div>
      <Form.Item valuePropName="fileList">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          maxCount={1}
          beforeUpload={() => false}
        >
          {fileList.length >= 1 ? null : (
            <div>
              <PlusOutlined />
              <div className="w-[100%]" style={{ marginTop: 8, width: "100%" }}>
                Upload Image
              </div>
            </div>
          )}
        </Upload>
      </Form.Item>
    </div>
  );
};

export default UploadAdFileInput;
