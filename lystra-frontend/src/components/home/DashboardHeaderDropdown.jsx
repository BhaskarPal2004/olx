import { Button, Dropdown } from "antd"
import LocationChange from '@/components/home/LocationChangeButton'
import { PlayIcon } from "lucide-react";
import Condition from "./Conditions";
import Location from "./Location";
import Category from "./Category";
import Price from '@/components/home/Price'
import { useState } from "react";
import SortBy from "./SortBy";
import CreateNewAdButton from "./CreateNewAdButton";
import { useSelector } from "react-redux";


const DashboardHeaderDropdown = () => {
    const { role } = useSelector(store => store.auth)
    const [open, setOpen] = useState(false);
    const handleMenuClick = (e) => {
        if (e.key === '7') {
            setOpen(false);
        }
    };

    const handleOpenChange = (nextOpen, info) => {
        if (info.source === 'trigger' || nextOpen) {
            setOpen(nextOpen);
        }
    };

    const items = [
        {
            label: <div className="md:hidden"><SortBy setOpen={setOpen} /></div>,
            key: '1',
        },
        {
            label: role === 'seller' ? <CreateNewAdButton /> : <LocationChange />,
            key: '2',
        },
        {
            label: <Category />,
            key: '3',
        },
        {
            label: <Price />,
            key: '4',
        },
        {
            label: <Location />,
            key: '5',
        },
        {
            label: <Condition />,
            key: '6',
        },
        {
            label: <Button color="default" variant="solid" className="w-full my-2">SUBMIT</Button>,
            key: '7',
        },
    ];

    return (
        <Dropdown menu={{ items, onClick: handleMenuClick }} onOpenChange={handleOpenChange} open={open} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
                <div className="flex gap-1 items-center justify-center">
                    Options <PlayIcon size={20} fill="#ED640F" strokeWidth={0} />
                </div>
            </a>
        </Dropdown>
    )
}

export default DashboardHeaderDropdown