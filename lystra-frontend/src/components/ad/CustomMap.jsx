import { useEffect, useState } from "react";

const CustomMap = ({ lat, lng }) => {
    const [coords, setCoords] = useState({ lat: 22.5744, lng: 88.3629 });

    useEffect(() => {
        setCoords({ lat, lng })
    }, [lat, lng])

    const query = `q=${coords.lat},${coords.lng}`

    return (
        <div className="w-full 4xl:w-[500px] mt-3 lg:m-0 h-[300px] rounded-xl">
            <iframe
                src={`https://maps.google.com/maps?${query}&hl=en&z=11&amp&output=embed`}
                className="h-full w-full rounded-xl">
            </iframe>
        </div >
    )
}

export default CustomMap