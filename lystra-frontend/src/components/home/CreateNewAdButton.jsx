import { setAdCreateModalVisible, setHandleToggleForm } from "@/store/slices/modalSlice"
import { Plus } from "lucide-react"
import { useDispatch } from "react-redux"

const CreateNewAdButton = () => {
    const dispatch = useDispatch()

    const handelOpenAdCreateModal = () => {
        dispatch(setAdCreateModalVisible(true))
        dispatch(setHandleToggleForm(false))
    }

    return (
        <button className="bg-[#ED640F] w-full font-medium py-[10px] rounded-[10px] text-white flex justify-center items-center gap-2" onClick={handelOpenAdCreateModal}>
            <Plus /> Create New ADs
        </button>
    )
}

export default CreateNewAdButton