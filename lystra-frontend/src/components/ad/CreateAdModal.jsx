import { Flex, Modal } from 'antd';
import CreateNewAdForm from '@/layouts/ad/CreateNewAdForm';
import { useDispatch, useSelector } from 'react-redux';
import { setAdCreateModalVisible } from '@/store/slices/modalSlice';
import UpdateAdForm from '@/layouts/ad/UpdateAdForm';

const CreateAdModal = () => {
    const { adCreateModalVisible, toggleForm } = useSelector(store => store.modal)
    const dispatch = useDispatch()
    const title = toggleForm ? "Update Ad" : "Create new Ad"

    return (
        <Flex vertical gap="middle" align="flex-start">
            <Modal
                title={title}
                centered
                open={adCreateModalVisible}
                onOk={() => dispatch(setAdCreateModalVisible(false))}
                onCancel={() => dispatch(setAdCreateModalVisible(false))}
                footer={null}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
            >
                {toggleForm ? <UpdateAdForm /> : <CreateNewAdForm />}
            </Modal>
        </Flex>
    );
};

export default CreateAdModal;