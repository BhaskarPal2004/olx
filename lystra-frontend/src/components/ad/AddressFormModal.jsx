import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { AddressSchema } from "@/validations/Ad/addressValidation";
import { yupResolver } from "@hookform/resolvers/yup/src/yup";
import { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const AddressFormModal = ({
  visible,
  onClose,
  setAddressData,
  addressInputRef,
  singleAd,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddressSchema),
  });

  const [address, setAddress] = useState("");

  useEffect(() => {
    if (singleAd?.adLocation) {
      const line1Val = singleAd.adLocation.line1 || "";

      reset({
        line1: line1Val,
        line2: singleAd.adLocation.line2 || "",
        city: singleAd.adLocation.city || "",
        state: singleAd.adLocation.state || "",
        country: singleAd.adLocation.country || "",
        landMark: singleAd.adLocation.landMark || "",
        pinCode: singleAd.adLocation.pinCode || "",
        lat: singleAd.adLocation.lat || "",
        lng: singleAd.adLocation.lng || "",
      });

      setAddress(line1Val);
    }
  }, [singleAd, reset]);
  // eslint-disable-next-line
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });

  const handleSelect = async (selected) => {
    setAddress(selected);
    setValue("line1", selected);
    await trigger("line1");

    try {
      const results = await geocodeByAddress(selected);
      const addressComponents = results[0]?.address_components || [];

      const components = {
        city: "",
        state: "",
        country: "",
        pincode: "",
      };

      addressComponents.forEach((comp) => {
        if (comp.types.includes("locality")) components.city = comp.long_name;
        if (comp.types.includes("administrative_area_level_1"))
          components.state = comp.long_name;
        if (comp.types.includes("country")) components.country = comp.long_name;
        if (comp.types.includes("postal_code"))
          components.pincode = comp.long_name;
      });

      const latLng = await getLatLng(results[0]);

      setCoordinates(latLng);
      setValue("city", components.city);
      setValue("state", components.state);
      setValue("country", components.country);
      setValue("pinCode", components.pincode);
      setValue("lat", latLng.lat);
      setValue("lng", latLng.lng);

    } catch (error) {
      console.error("Error getting address details:", error);
    }
  };

  const onSubmission = (data) => {
    setAddressData(data);
    onClose();
  };

  return (
    <Modal
      title="Enter Address"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <form
        onSubmit={handleSubmit(onSubmission)}
        className="flex flex-col gap-3"
        ref={addressInputRef}
      >
        <input type="hidden" {...register("lat")} />
        <input type="hidden" {...register("lng")} />

        <div className="flex flex-wrap gap-3 justify-center items-center w-full">
          <div className="w-full md:w-[48.5%]">
            <label htmlFor="line1">Line 1</label>
            <PlacesAutocomplete
              value={address}
              onChange={(val) => {
                setAddress(val);
                setValue("line1", val);
                trigger("line1");
              }}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div className="relative">
                  <input
                    {...getInputProps({
                      placeholder: "Enter line 1",
                      className: "border outline-none rounded-lg p-2 w-full",
                    })}
                  />
                  <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
                    {errors.line1?.message}
                  </p>

                  {suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {loading && (
                        <div className="p-3 text-gray-500">Loading...</div>
                      )}
                      {suggestions.map((suggestion) => {
                        const isActive = suggestion.active;
                        return (
                          <div
                            key={suggestion.placeId}
                            {...getSuggestionItemProps(suggestion, {
                              className: `cursor-pointer p-3 transition ${
                                isActive
                                  ? "bg-blue-100 text-blue-900"
                                  : "hover:bg-gray-100"
                              }`,
                            })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </PlacesAutocomplete>
          </div>

          <div className="w-full md:w-[48.5%]">
            <label htmlFor="line2">Line 2</label>
            <input
              {...register("line2")}
              placeholder="Enter line 2"
              className="border outline-none rounded-lg p-2 w-full"
            />
            <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
              {errors.line2?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center items-center w-full">
          <div className="w-full md:w-[48.5%]">
            <label htmlFor="state">State</label>
            <input
              {...register("state")}
              placeholder="Enter State"
              className="border outline-none rounded-lg p-2 w-full"
            />
            <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
              {errors.state?.message}
            </p>
          </div>

          <div className="w-full md:w-[48.5%]">
            <label htmlFor="city">City</label>
            <input
              {...register("city")}
              placeholder="Enter city"
              className="border outline-none rounded-lg p-2 w-full"
            />
            <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
              {errors.city?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center items-center w-full">
          <div className="w-full md:w-[48.5%]">
            <label htmlFor="country">Country</label>
            <input
              {...register("country")}
              placeholder="Enter country"
              className="border outline-none rounded-lg p-2 w-full"
            />
            <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
              {errors.country?.message}
            </p>
          </div>

          <div className="w-full md:w-[48.5%]">
            <label htmlFor="pinCode">PinCode</label>
            <input
              type="number"
              {...register("pinCode")}
              placeholder="Enter pinCode"
              className="border outline-none rounded-lg p-2 w-full"
            />
            <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
              {errors.pinCode?.message}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 w-full">
          <label htmlFor="landMark">LandMark</label>
          <input
            {...register("landMark")}
            placeholder="Enter landMark"
            className="border outline-none rounded-lg p-2 w-full"
          />
          <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
            {errors.landMark?.message}
          </p>
        </div>

        <button className="flex self-end justify-center p-3 rounded-md w-[150px] bg-[#ED640F] text-white hover:bg-[#cf7841]">
          Save Address
        </button>
      </form>
    </Modal>
  );
};

export default AddressFormModal;
