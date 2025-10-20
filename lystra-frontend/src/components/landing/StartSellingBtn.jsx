import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function StartSellingBtn() {
  const navigate=useNavigate();
  return (
    <Button
      type="primary"
      onClick={() => {
        navigate('/auth/login')
      }}
      className={`bg-[#273EF0] rounded-[10px] text-white hover:!bg-[#3a4069] md:p-5 2xl:p-0 2xl:h-[64px] 2xl:w-[172px] hover:!text-[#FFFFFF] font-archivo text-[12px] md:text-[16px]`}
    >
      Start Selling
    </Button>
  )
}
