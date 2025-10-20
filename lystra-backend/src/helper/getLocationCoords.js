import opencage from 'opencage-api-client'

export const getLocationCoords = async (city, state) => {
    const response = await opencage.geocode({ q: city, state })

    if (response.status.code === 200 && response.results.length > 0) {
        return response.results[0].geometry
    } else {
        return null
    }
}