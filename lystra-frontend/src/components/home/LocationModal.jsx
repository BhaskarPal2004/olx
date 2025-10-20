import { useState } from "react";
import { useDispatch } from "react-redux";
import { MapPin } from "lucide-react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { setLocationChangeModalVisible } from "@/store/slices/modalSlice";
import { setChangeAddress } from "@/store/slices/addressSlice";
import { setUserLocation } from "@/store/slices/userSlice";

const LocationModal = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleSelect = async (value) => {
        setSearch(value);
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);

            setSelectedLocation({
                address: value,
                lat: latLng.lat,
                lng: latLng.lng,
            });

            dispatch(setUserLocation({
                lat: latLng.lat,
                lng: latLng.lng,
            }))
        } catch (err) {
            console.error("Geocoding failed:", err);
        }
    };

    const handleSubmit = () => {
        if (selectedLocation) {
            console.log("Submitting location:", selectedLocation);
            // optionally dispatch to redux
        } else {
            console.log("No location selected, using typed value:", search);
        }
        dispatch(setChangeAddress(selectedLocation));
        dispatch(setLocationChangeModalVisible(false));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] font-archivo">
            <div className="bg-white rounded-2xl w-[90%] sm:w-[80%] md:w-[50%] lg:w-[35%] shadow-xl">

                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Change Location</h2>
                    <button
                        onClick={() => dispatch(setLocationChangeModalVisible(false))}
                        className="text-gray-400 hover:text-gray-800 text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>


                <div className="px-5 pt-4 pb-2">
                    <PlacesAutocomplete value={search} onChange={setSearch} onSelect={handleSelect}>
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className="relative">
                                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-3 bg-white">
                                    <MapPin color="orange" size={20} />
                                    <input
                                        {...getInputProps({
                                            placeholder: "Search your location...",
                                            className: "w-full outline-none text-sm py-2",
                                        })}
                                    />
                                </div>

                                {suggestions.length > 0 && (
                                    <div className="mt-3 rounded-xl bg-[#f5f6fa] shadow-lg divide-y divide-gray-200 overflow-hidden max-h-60 overflow-y-auto">
                                        {loading && <div className="p-3 text-gray-400 text-sm">Loading...</div>}
                                        {suggestions.map((suggestion) => (
                                            <div
                                                key={suggestion.placeId}
                                                {...getSuggestionItemProps(suggestion, {
                                                    className:
                                                        "flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer text-gray-700",
                                                })}
                                            >
                                                <MapPin color="gray" size={18} />
                                                <span className="text-sm truncate whitespace-nowrap overflow-hidden w-full">
                                                    {suggestion.description}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </PlacesAutocomplete>
                </div>


                <div className="px-5 py-4 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#ED640F] hover:bg-[#cf7841] text-white px-6 py-2 rounded-lg transition"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;
