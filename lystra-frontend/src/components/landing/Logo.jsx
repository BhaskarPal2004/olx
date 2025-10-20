import { Link } from "react-router-dom";
import logo from '@/assets/navbar/logo.svg';

const Logo = ({ color }) => {
  return (
    <Link to="/" >
      <div className="flex items-center justify-center">
        <img src={logo} alt="lystra logo" className="h-[30px] 2xl:h-[52px]" />
        <div className={`${color} ml-2 font-Mplus1p 2xl:text-[33.41px] font-bold`}>Lystra</div>
      </div>
    </Link>
  )
}

export default Logo