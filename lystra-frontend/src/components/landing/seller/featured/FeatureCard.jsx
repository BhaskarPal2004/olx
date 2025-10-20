import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ image, title, description }) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const handleHoverCard = (flag) => {
    flag ? setIsHover(true) : setIsHover(false);
  };

  return (
    <div
      className="w-full sm:w-[290px] lg:w-[310px] 2xl:w-[370px] h-[208px] xl:h-[212px] 2xl:h-[287px] flex items-center justify-center cursor-pointer"
      onMouseEnter={() => handleHoverCard(true)}
      onMouseLeave={() => handleHoverCard(false)}
    >
      {isHover ? (
        <div className="flex flex-col items-center">
          <p className="font-medium mb-[17px]">Start Selling Today!</p>
          <Button
            type="primary"
            onClick={() => {
              navigate('/auth/login')
            }}
            className={`bg-[#273EF0] rounded-[10px] text-white hover:!bg-[#1b2cab] p-5 2xl:px-[32px] 2xl:py-6 hover:!text-[#FFFFFF] font-archivo font-semibold text-base`}
          >
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <div className="border border-[#E6E6E6] w-full p-5 rounded-lg 2xl:py-9 2xl:pl-[52px] hover:bg-[#F7F7F7] hover:shadow-md transition-all cursor-pointer">
          <img
            src={image}
            alt="ads"
            className="mb-9 w-[50px] 2xl:w-[70px] 2xl:mb-[55px] hover:scale-105 transition-transform"
          />
          <h4 className="text-[#0C0C0C] xl:text-lg 2xl:text-xl mb-2 2xl:mb-3">
            {title}
          </h4>
          <p className="text-[#828282] w-[232px] font-light hover:text-[#555555] transition-colors">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
