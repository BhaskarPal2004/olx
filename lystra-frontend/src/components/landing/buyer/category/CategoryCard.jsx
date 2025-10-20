import { Link } from "react-router-dom";

const CategoryCard = ({ imageSrc, name }) => {
  return (
    <Link
      to="/auth/login"
      className="flex flex-col items-center p-[15px] transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      <img src={imageSrc} alt={name} className="max-w-[170px] w-full h-auto" />
      <p className="mt-4 text-center text-[#0C0C0C]">{name}</p>
    </Link>
  );
};

export default CategoryCard;
