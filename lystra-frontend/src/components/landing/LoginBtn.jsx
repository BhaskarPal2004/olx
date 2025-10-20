import { Button } from "antd";
import { Link } from "react-router-dom";


const LoginBtn = () => {

  return (
    <Link to={'/auth/login'}>
      <Button
        type="primary"
        className="bg-[#FFBD17] text-[#382D13] hover:!bg-[#ED640F] hover:!text-[#FFFFFF] rounded-full 2xl:h-[56px] 2xl:w-[126px] font-archivo 2xl:text-[16px] font-medium hover:scale-110 transition"
      >
        Login
      </Button>
    </Link >
  )
}

export default LoginBtn