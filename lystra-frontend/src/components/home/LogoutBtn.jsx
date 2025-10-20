import useAxiosInstance from "@/hooks/useAxiosInstance";
import {
    setLoading,
} from "@/store/slices/authSlice";
import { Button, Popconfirm } from "antd";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "@/store/store";
import persistStore from "redux-persist/es/persistStore";

const LogoutBtn = () => {
    const persistor = persistStore(store);
    const { role, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { userApi } = useAxiosInstance();
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            dispatch(setLoading(true));
            const response = await userApi.delete('/logout');

            if (response?.success) {
                toast.success("You are logged out");
                // ✅ Clear full Redux store state and persisted data
                store.dispatch({ type: "RESET_STORE" });
                await persistor.purge();
                navigate(`/${role}`);
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error?.response?.data?.message || "Logout failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const confirm = () => logout();
    const cancel = (e) => console.log("Logout cancelled", e);
    return (
        <Popconfirm
            title="Do you want to log out?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement="bottom"
        >
            <Button color="danger" variant="solid" loading={loading}>
                Logout
            </Button>
        </Popconfirm>
    )
};

export default LogoutBtn;