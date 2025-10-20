import LocationChangeButton from "@/components/home/LocationChangeButton";
import Category from "@/components/home/Category";
import Price from "@/components/home/Price";
import Location from "@/components/home/location";
import Condition from "@/components/home/Conditions";
import { useSelector } from "react-redux";
import CreateNewAdButton from "@/components/home/CreateNewAdButton";

const HomeSideBar = () => {
  const { role } = useSelector((store) => store.auth);
  return (
    <aside className="hidden 2xl:block w-[270px] max-h-[70vh] overflow-scroll no-scrollbar">
      {role === "seller" ? <CreateNewAdButton /> : <LocationChangeButton />}
      <Category />
      <Price />
      <Location />
      <Condition />
    </aside>
  );
};

export default HomeSideBar;