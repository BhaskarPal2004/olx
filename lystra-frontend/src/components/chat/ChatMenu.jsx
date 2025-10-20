import { useState } from 'react';
import { Dropdown, Popconfirm, Space } from 'antd';
import { Ellipsis } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import { setBlock } from '@/store/slices/blockAndReportSlice';
import ReportModal from './ReportModal';

const ChatMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userApi } = useAxiosInstance();

    const receiverId = useSelector(store => store.chat.currentReceiver.id);
    const sellerName = useSelector(store => store.chat.currentReceiver.name);
    const { isBlocked } = useSelector(store => store.blockAndReport);

    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const handleBlock = async () => {
        try {
            const res = await userApi.post(`/blockUser/${receiverId}`);
            if (res.success) {
                toast.success(`${sellerName} successfully blocked`);
                dispatch(setBlock(true));
                navigate('/chat');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to block');
            console.error(error);
        }
    };

    const handleUnblock = async () => {
        try {
            const res = await userApi.post(`/unblockUser/${receiverId}`);
            if (res.success) {
                toast.success(`${sellerName} successfully unblocked`);
                dispatch(setBlock(false));
                navigate('/chat');
            }
        } catch (error) {
            toast.error(`${sellerName} was not successfully unblocked`);
            console.error(error);
        }
    };

    const cancelBlock = () => {
        // Optional: logic for canceling block/unblock confirm
    };

    const handleReportSubmit = async (reportData) => {
        
        const payload = {
            userId: receiverId,
            message: `report:${reportData.reportType}, message:${reportData.details}`,
        };

        try {
            const res = await userApi.post('/reportUser', payload);
            if (res.success) {
                toast.success(`you successfully report ${sellerName}`)
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
        }

    };

    const items = [
        {
            label: !isBlocked ? (
                <Popconfirm
                    title={`Block ${sellerName}`}
                    description="Are you sure you want to block this user?"
                    onConfirm={handleBlock}
                    onCancel={cancelBlock}
                    okText="Yes"
                    cancelText="No"
                >
                    <button className="w-24 text-start p-2" onClick={(e) => e.stopPropagation()}>
                        Block
                    </button>
                </Popconfirm>
            ) : (
                <Popconfirm
                    title={`Unblock ${sellerName}`}
                    description="Are you sure you want to unblock this user?"
                    onConfirm={handleUnblock}
                    onCancel={cancelBlock}
                    okText="Yes"
                    cancelText="No"
                >
                    <button className="w-24 text-start p-2" onClick={(e) => e.stopPropagation()}>
                        Unblock
                    </button>
                </Popconfirm>
            ),
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <button
                    className="w-24 text-start py-1 px-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsReportModalOpen(true);
                    }}
                >
                    Report
                </button>
            ),
            key: '1',
        },
    ];

    return (
        <>
            <Dropdown menu={{ items }} trigger={['click']} placement="bottomLeft" className="cursor-pointer">
                <Space>
                    <Ellipsis color="#A0A4A8" />
                </Space>
            </Dropdown>

            <ReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                onSubmit={handleReportSubmit}
            />
        </>
    );
};

export default ChatMenu;
