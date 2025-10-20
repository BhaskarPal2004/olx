import ChatBtn from "@/components/landing/ChatBtn";
import Logo from "@/components/landing/Logo";
import MyProfileBtn from "@/components/landing/MyProfileBtn";
import SearchBar from "@/components/landing/SearchBar";
import WishlistBtn from "@/components/landing/WishlistBtn";
import { Button, Drawer, Grid, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";



const AuthNavbar = () => {
    const { useBreakpoint } = Grid
    const screens = useBreakpoint();
    const [visible, setVisible] = useState(false)
    const showDrawer = () => setVisible(true);
    const closeDrawer = () => setVisible(false);



    return (
        <>
            {
                screens.md ? (
                    <nav className="py-[20px] flex gap-2 justify-around">
                        <div>
                            <Logo />
                        </div>
                        <div>
                            <SearchBar />
                        </div>
                        <div className="flex gap-6 justify-between items-center">
                            <p>My ADS</p>
                            <p>Help</p>
                            <ChatBtn />
                            <WishlistBtn />
                            <MyProfileBtn />
                        </div>


                    </nav>

                ) : (
                    <>
                        <nav className="py-[20px] w-full flex justify-center items-center px-[10px]">
                            <div className="w-[150px]"><Logo /></div>
                            <div className="flex gap-2 s:gap-4 items-center w-[99%] justify-end">
                                <SearchBar />
                                <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
                            </div>
                        </nav>
                    </>

                )
            }
            <Drawer title="Menu" placement="right" onClose={closeDrawer} open={visible}>
                <Menu mode="vertical" className="!border-none font-normal flex flex-col justify-center items-center text-center">
                    <Menu.Item key="1" >My ADS</Menu.Item>
                    <Menu.Item key="2">Help</Menu.Item>
                    <Menu.Item key="3" className="!flex justify-center items-center"><ChatBtn /></Menu.Item>
                    <Menu.Item key="4" className="!flex justify-center items-center"><MyProfileBtn /></Menu.Item>
                </Menu>
            </Drawer>
        </>

    )
}

export default AuthNavbar

