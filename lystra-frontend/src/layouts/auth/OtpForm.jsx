import { Spin } from "antd"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from 'react-router-dom'
import { otpSchema } from "@/validations/auth/otpValidation";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setLoading, setRefreshToken, setRole, setUser } from "@/store/slices/authSlice";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import toast from "react-hot-toast";


const OtpForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(otpSchema) });
    const dispatch = useDispatch()
    const { loading } = useSelector(store => store.auth)
    const { otpApi } = useAxiosInstance()
    const navigate = useNavigate()
    const params = useParams()
    const otpToken = params.otpToken

    const onSubmit = async (data, e) => {
        try {
            dispatch(setLoading(true))
            const res = await otpApi.post(`/verify/otp/${otpToken}`, data)
            if (res.success) {
                dispatch(setUser(res.data))
                dispatch(setRole(res.role))
                dispatch(setAccessToken(res.accessToken))
                dispatch(setRefreshToken(res.refreshToken))
                navigate(`/${res.role}/home`)
                e.target.reset()
                toast.success(res.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div>
            <h1 className="text-xl text-center my-10">Enter One Time Password (OTP)<span className="text-red-500">*</span></h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col px-2 mt-10">
                <input type="number" name="otp" placeholder="Enter OTP" className="border border-[#DDDDDD] py-2 2xl:py-5 4xl:pt-[19px] px-6 rounded-[10px] placeholder:text-[#B0B3B6] focus:outline-none" {...register("otp")} />
                <p className='text-red-600 text-xs font-semibold h-6 2xl:h-3 pt-1 ps-1'>{errors.otp?.message}</p>
                <button type='submit' className="bg-[#ED640F] hover:!bg-[#de7c40] mb-10 mt-5 py-3 2xl:py-[18px] 4xl:py-[20px] font-semibold text-white rounded-[10px] text-xl">
                    {loading ? <Spin /> : <span>Submit</span>}
                </button>
            </form>
        </div>
    )
}

export default OtpForm