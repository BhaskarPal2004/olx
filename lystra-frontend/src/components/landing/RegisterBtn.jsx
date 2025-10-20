import { setRegisterRole } from '@/store/slices/authSlice';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSetRegisterRole = (e) => {
        dispatch(setRegisterRole(e.target.textContent.toLowerCase()))
        navigate('/auth/signup')
    }

    const items = [
        {
            key: '1',
            label: 'Register As',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <button className='font-semibold py-1 w-full text-orange-500' onClick={handleSetRegisterRole}>Buyer</button>,
        },
        {
            key: '3',
            label: <button className='font-semibold py-1 w-full text-orange-500' onClick={handleSetRegisterRole}>Seller</button>,
        },
    ];

    return (
        <Dropdown menu={{ items }}>
            <a onClick={e => e.preventDefault()}>
                <Space className='hover:text-blue-500 cursor-pointer 4xl:ml-5 text-[18px]'>
                    Register <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )
}

export default RegisterBtn