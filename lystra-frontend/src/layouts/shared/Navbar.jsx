import { Button, Drawer, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import { Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/landing/Logo";
import LoginBtn from "@/components/landing/LoginBtn";
import RegisterBtn from "@/components/landing/RegisterBtn";

const { useBreakpoint } = Grid;

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const handleCategoryClick = () => {
    if (window.location.pathname === "/buyer") {
      window.scrollToCategory?.(); // Scroll if already on page
    } else {
      navigate("/buyer#category"); // Redirect and scroll
    }
  };

  return (
    <Header className="flex justify-between items-center mx-3 lg:mx-[60px] lg:my-[10px] 2xl:mx-[130px] 2xl:my-[30px] 4xl:pt-[29px] 4xl:mb-[34px] 4xl:mr-[130px] 4xl:ml-[133px] p-0 bg-white">
      {screens.md ? (
        <div className="flex justify-between w-full bg-white">
          <Logo color={"text-black"} />
          <div className="flex items-center gap-10 lg:gap-15 4xl:gap-0">
            <div className="flex gap-5 text-[14px] lg:gap-10 2xl:text-[18px] 4xl:gap-[66px] text-[#0c0c0c]">
              <div
                className="hover-effect cursor-pointer"
                onClick={handleCategoryClick}
              >
                Categories
              </div>
              <Link to="/buyer" className="hover:text-black">
                <div className="hover-effect cursor-pointer">Buy Items</div>
              </Link>
              <Link to="/seller" className="hover:text-black">
                <div className="hover-effect cursor-pointer">Sell Items</div>
              </Link>
              <Link to="/help" className="hover:text-black">
                <div className="hover-effect cursor-pointer">Help & Support</div>
              </Link>
            </div>
            <div className="flex gap-5">
              <RegisterBtn />
              <LoginBtn />
            </div>
          </div>
        </div>
      ) : (
        <>
          <Logo color={"text-black"} />
          <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
        </>
      )}

      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={visible}
        extra={<Button type="text" ghost className="size-[20px] mt-3" />}
      >
        <Menu mode="vertical" className="!border-none font-normal">
          <Menu.Item key="1" onClick={handleCategoryClick}>
            Categories
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/buyer">Buy Items</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/seller">Sell Items</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/help">Help & Support</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <LoginBtn />
          </Menu.Item>
        </Menu>
      </Drawer>
    </Header>
  );
}
