import { Dropdown, Space } from "antd";
import MyProfileBtn from "./MyProfileBtn";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import LogoutBtn from "../home/LogoutBtn";
import { useState } from "react";
import { useSelector } from "react-redux";

const DropdownMenu = ({ screen }) => {
  const [open, setOpen] = useState(false);
  const { role } = useSelector((state) => state.auth);
  const handleMenuClick = (e) => {
    if (e.key === "7") {
      setOpen(true);
    }
  };
  const handleOpenChange = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };
  const items = [
    {
      label: (
        <div className="text-[#707070] font-medium px-[13px] py-[6px] text-base">
          Quick Links
        </div>
      ),
      type: "group",
    },
    { type: "divider" },
    {
      label: (
        <Link to="/transactions" className="font-semibold">
          <div className="flex justify-between py-[5px] pl-[11px] pr-[3px] w-[218px] items-center md:text-base">
            Transactions <ChevronRight />
          </div>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link to="/purchase" className="font-semibold">
          <div className="flex justify-between py-[5px] pl-[11px] pr-[3px] items-center md:text-base">
            {role === "buyer" ? (
              <>
                Purchased History <ChevronRight />
              </>
            ) : (
              <>
                Sold Items <ChevronRight />
              </>
            )}
          </div>
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link to="/profile" className="font-semibold">
          <div className="flex justify-between py-[5px] pl-[11px] pr-[3px] items-center md:text-base">
            Account <ChevronRight />
          </div>
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link to="/ad/reviews/:adId" className="font-semibold">
          <div className="flex justify-between py-[5px] pl-[11px] pr-[3px] items-center md:text-base">
            Reviews <ChevronRight />
          </div>
        </Link>
      ),
      key: "4",
    },

    {
      label: (
        <Link to="/BlockUser" className="font-semibold">
          <div className="flex justify-between py-[5px] pl-[11px] pr-[3px] items-center md:text-base">
            Blocked User <ChevronRight />
          </div>
        </Link>
      ),
      key: "5",
    },

    {
      label: (
        <div className=" flex py-[5px] pl-[11px] pr-[3px]">
          <LogoutBtn />
        </div>
      ),
      key: "6",
      style: { backgroundColor: "transparent" },
    },
  ];

  return (
    <div className="relative inline-block">
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        onOpenChange={handleOpenChange}
        open={open}
        trigger={["click"]}
        placement={screen === "small" ? "bottom" : "bottomRight"}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        dropdownRender={(menu) => (
          <div className="mt-1 font-Manrope text-base">{menu}</div>
        )}
        className="cursor-pointer"
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MyProfileBtn />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
