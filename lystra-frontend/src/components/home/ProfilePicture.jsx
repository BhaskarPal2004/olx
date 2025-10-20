import Avatar from "antd/es/avatar/Avatar";
import dummyImg from "@/assets/profile/user.svg";
import { Badge, Form, Modal, Upload } from "antd";
import { Edit } from "lucide-react";
import { useState } from "react";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useGetUser from "@/hooks/user/useGetUser";

const ProfilePicture = ({ isModalOpen, setIsModalOpen }) => {
  const getUserData = useGetUser();
  const { userApi } = useAxiosInstance();

  const [hover, setHover] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { user } = useSelector((store) => store.auth);
  const imageSrc = user?.profilePicture || dummyImg;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!profilePicture) {
      toast.error("Please select an image before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);

      const response = await userApi.post("/uploadProfilePicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.success) {
        await getUserData();
        toast.success(response.message);
        setIsModalOpen(false);
        setFileList([]);
        setProfilePicture(null);
        setPreviewUrl(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload profile picture");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFileList([]);
    setProfilePicture(null);
    setPreviewUrl(null);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);

    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setProfilePicture(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div onClick={showModal}>
        {hover ? (
          <Badge count={<Edit fill="#edeaea" />} offset={[-20, 79]}>
            <Avatar src={imageSrc} alt="profilePic" size={100} />
          </Badge>
        ) : (
          <Avatar src={imageSrc} alt="profilePic" size={100} />
        )}
      </div>

      <Modal
        title="Upload your profile picture"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Preview area */}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border"
            />
            
          )}
          

          <Form.Item valuePropName="fileList" className="w-full">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              maxCount={1}
              beforeUpload={() => false}
              showUploadList={{ showPreviewIcon: false }}
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload Image</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <h2 className="text-center mt-[-10px]">
            *Only JPEG (JPG) and PNG image formats are allowed
          </h2>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePicture;
