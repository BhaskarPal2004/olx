import { setLocationChangeModalVisible } from "@/store/slices/modalSlice";
import { MapPin, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const LocationChangeButton = () => {
  const dispatch = useDispatch();
  const { userLocation } = useSelector(store => store.user);
  const { changeAddress } = useSelector(store => store.address);

  const displayAddress = changeAddress?.address?.trim()
    ? changeAddress.address
    : (userLocation?.locality?.trim() || "Kolkata") + ", " + (userLocation?.city?.city?.trim() || "West Bengal");

  return (
    <button
      className="flex w-[270px] gap-2 border rounded-md p-2 shadow-sm items-center justify-between bg-white"
      onClick={() => dispatch(setLocationChangeModalVisible(true))}
    >
      <div className="flex justify-center items-center gap-2 font-archivo">
        <MapPin color="orange" />
        <p className="m-0 truncate w-[200px]">{displayAddress}</p>
      </div>
      <ChevronRight color="orange" />
    </button>
  );
};

export default LocationChangeButton;
