
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space } from 'antd';
import { MoveDown, MoveUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAscending, setDescending, setSortBy } from '@/store/slices/adSlice';

const SortBy = (props) => {
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState({
        label: 'Date Published',
        icon: <MoveUp size={14} />,
    });

    const items = [
        { label: 'Date Published', key: '1', icon: <MoveUp size={14} />, value: 'createdAt', order: 'asc' },
        { label: 'Date Published', key: '2', icon: <MoveDown size={14} />, value: 'createdAt', order: 'dsc' },
        { label: 'Price', key: '3', icon: <MoveUp size={14} />, value: 'price', order: 'dsc' },
        { label: 'Price', key: '4', icon: <MoveDown size={14} />, value: 'price', order: 'asc' },
    ];

    const handleMenuClick = e => {
        const selectedItem = items.find(item => item.key === e.key);
        if (selectedItem) {
            setSelectedOption({ label: selectedItem.label, icon: selectedItem.icon });
            message.info(`Sorted by ${selectedItem.label}`);
        }
        console.log(items[e.key - 1].value, items[e.key - 1].order)
        if (props.setOpen) props.setOpen(false)

        dispatch(setSortBy(items[e.key - 1].value))

        if (items[e.key - 1].order === 'asc') dispatch(setAscending())
        else dispatch(setDescending())


    };

    const menuProps = { items, onClick: handleMenuClick };

    return (
        <div className="flex gap-2 items-center justify-between font-archivo">
            <span className='text-[#5D5D5D] text-[14px] '>Sort by:</span>
            <Dropdown menu={menuProps}>
                <Button>
                    <Space className='text-[14px] w-[150px] flex'>
                        {selectedOption.icon}{selectedOption.label}
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    );
};

export default SortBy;
