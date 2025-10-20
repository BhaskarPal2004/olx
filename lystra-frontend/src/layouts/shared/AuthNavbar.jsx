import ChatBtn from "@/components/landing/ChatBtn";
import Logo from "@/components/landing/Logo";
import SearchBar from "@/components/landing/SearchBar";
import WishlistBtn from "@/components/landing/WishlistBtn";
import { Button, Drawer, Grid, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DropdownMenu from "@/components/landing/DropdownMenu";


const AuthNavbar = () => {
    const screens = Grid.useBreakpoint();
    const { role } = useSelector(store => store.auth)
    const [visible, setVisible] = useState(false)
    const showDrawer = () => setVisible(true);
    const closeDrawer = () => setVisible(false);

    return (
        <>
            {
                screens.md ? (
                    <nav className="py-[18px] flex gap-2 justify-around bg-white">
                        <Logo />
                        <SearchBar />
                        <div className="flex gap-6 justify-between items-center">
                            <Link to={`/${role}/home`}><p className="m-0 cursor-pointer font-archivo 4xl:text-lg">My ADS</p></Link>
                            <Link to='/help'><p className="m-0 font-archivo 4xl:text-lg">Help</p></Link>
                            <ChatBtn />
                            <WishlistBtn />
                            <DropdownMenu screen="big" />
                        </div>
                    </nav>
                ) : (
                    <nav className="py-[20px] w-full flex justify-center items-center px-[10px] bg-white">
                        <div className="w-[150px]"><Logo /></div>
                        <div className="flex gap-2 s:gap-4 items-center w-[99%] justify-end">
                            <SearchBar />
                            <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
                        </div>
                    </nav>
                )
            }
            <Drawer title="Menu" placement="right" onClose={closeDrawer} open={visible}>
                <Menu mode="vertical" className="!border-none font-normal flex flex-col justify-center items-center text-center">
                    <Menu.Item key="1"><Link to={`/${role}/home`}>My ADS</Link></Menu.Item>
                    <Menu.Item key="2"><Link to='/help'></Link>Help</Menu.Item>
                    <Menu.Item key="3" className="!flex justify-center items-center"><ChatBtn /></Menu.Item>
                    <DropdownMenu screen="small" />
                    <Menu.Item key="4" className="!flex justify-center items-center"></Menu.Item>
                </Menu>
            </Drawer>
        </>

    )
}

export default AuthNavbar

