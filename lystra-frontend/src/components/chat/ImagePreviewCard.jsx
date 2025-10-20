import { setImagePreview } from "@/store/slices/chatSlice";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux"

const ImagePreviewCard = () => {
    const imagePreview = useSelector(store => store.chat.imagePreview)
    const dispatch = useDispatch()

    const removeImage = () => dispatch(setImagePreview(null))

    return (
        <div className="mb-3 flex items-center gap-2 absolute bottom-11 left-3 ">
            <div className="relative">
                <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-40 2xl:w-96 object-cover rounded-lg"
                />
                <button
                    onClick={removeImage}
                    className="absolute text-5xl -top-[25px] -right-1.5 cursor-pointer"
                    type="button"
                >
                    <X />
                </button>
            </div>
        </div>
    )
}

export default ImagePreviewCard