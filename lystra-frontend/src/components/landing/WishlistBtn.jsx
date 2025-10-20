import { Button } from "antd";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WishlistBtn = () => {
    const navigate = useNavigate();
    return (
        <Button
            className="!bg-[#E6E6E6] !text-black !border-none !shadow-none 
                       hover:!bg-[#E6E6E6] active:!bg-[#E6E6E6] focus:!bg-[#E6E6E6] 
                       !outline-none"
                       onClick={()=>{
                           navigate('/favoriteAd')
                       }}
        >
            <div className="flex gap-[6px] justify-center items-center group">
                <Heart
                    fill="#A8A8A8"
                    stroke="#A8A8A8"
                />
                <span>Wishlist</span>
            </div>
        </Button>
    );
};

export default WishlistBtn;
