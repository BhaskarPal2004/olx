import { setUserLocation } from "@/store/slices/userSlice"
import axios from "axios"
import { useDispatch } from "react-redux"

const useGetUserCoords = () => {
    const dispatch = useDispatch()
    const successCallback = async (position) => {
        try {
            const lat = position.coords.latitude
            const lng = position.coords.longitude

            const res = await axios.get(`https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${lat}&${lng}=-122.0837&localityLanguage=en`)
            if (res.status === 200) {
                dispatch(setUserLocation({
                    lat: res.data.latitude,
                    lng: res.data.longitude,
                    locality: res.data.locality,
                    city: res.data.city,
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const failureCallback = (error) => {
        console.log(error.message)
        dispatch(setUserLocation({
            lat: 22.579999923706055,
            lng: 88.43000030517578,
            locality: 'hello',
            city: 'Kolkata',
        }))
    }

    if (window.navigator) {
        navigator.geolocation.getCurrentPosition(successCallback, failureCallback)
    }
}

export default useGetUserCoords