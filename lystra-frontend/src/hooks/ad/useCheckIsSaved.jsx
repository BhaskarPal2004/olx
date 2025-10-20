import { useSelector } from "react-redux"

const useCheckIsSaved = (adId) => {
    const { favoriteAd } = useSelector(store => store.ad)
    
    if (favoriteAd?.find(({ _id }) => _id === adId)) {
        return true
    }
    return false
}

export default useCheckIsSaved