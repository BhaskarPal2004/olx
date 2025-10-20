import { Modal } from "antd";
import dummyImg from "@/assets/profile/user.svg";

const RepliesModal = ({ isOpen, onClose, replies,sellerName,sellerImg }) => {
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            footer={null}
            title="Replies"
            width={600}
        >
            <div className="flex flex-col gap-4">
                {replies.length === 0 ? (
                    <p className="text-center text-gray-500">No replies yet.</p>
                ) : (
                    replies.map((reply, index) => (
                        <div key={index} className="flex gap-4 items-start">
                            <img
                                src={sellerImg || dummyImg}
                                alt="replier"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="bg-[#F9F9F9] p-3 rounded-md max-w-[80%]">
                                <p className="font-semibold text-[#0C0C0C] mb-1">
                                    {sellerName || "Anonymous"}
                                </p>
                                <p className="text-sm text-[#555]">{reply.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Modal>
    );
};

export default RepliesModal;
