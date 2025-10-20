import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSchema } from "@/validations/auth/loginValidation";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/slices/authSlice";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import RegisterBtn from "@/components/landing/RegisterBtn";
import toast from "react-hot-toast";
import store from "@/store/store";
import persistStore from "redux-persist/es/persistStore";
import EmailInputModal from "@/components/EmailInputModal";

const LoginForm = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<EyeOff />);
  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [resendModalVisible, setResendModalVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const { authApi } = useAxiosInstance();
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.pathname.split("/")[1];
  const onSubmit = async (data, e) => {
    const persistor = persistStore(store);

    try {
      store.dispatch({ type: "RESET_STORE" });
      await persistor.purge();

      dispatch(setLoading(true));
      const res = await authApi.post("/login", data);
      if (res?.success) {
        toast.success(res.message);
        navigate(`/${role}/verify/otp/${res.otpToken}`);
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.response?.data);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleTogglePassword = () => {
    if (type === "password") {
      setIcon(<Eye />);
      setType("text");
    } else {
      setIcon(<EyeOff />);
      setType("password");
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      setModalLoading(true);
      const res = await authApi.post("/forgotPassword", {
        email,
      });

      toast.success(res.message || "Password reset link sent.");
      setForgotModalVisible(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending email.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleResendVerification = async (email) => {
    try {
      setModalLoading(true);
      const res = await authApi.post("/resendMail", { email });
      toast.success(res.message || "Verification mail sent.");
      setResendModalVisible(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resending email.");
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="font-medium text-2xl 2xl:text-[35px] 4xl:text-[40px] 2xl:mb-2 4xl:mb-[15px]">
          Welcome back!
        </h2>
        <h5 className="text-[#0C0C0C] 4xl:mb-11">Please enter your details</h5>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-5 2xl:px-[108px] 4xl:px-[100px] flex flex-col gap-1 2xl:gap-4"
      >
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-[#52575C]">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            className="border border-[#DDDDDD] py-5 4xl:pt-[19px] px-6 rounded-[10px] placeholder:text-[#B0B3B6] focus:outline-none"
            {...register("email")}
          />
          <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
            {errors.email?.message}
          </p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-[#52575C]">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type={type}
              name="password"
              placeholder="Enter password"
              className="border border-[#DDDDDD] py-5 4xl:pt-[19px] px-6 rounded-[10px] w-full placeholder:text-[#B0B3B6] focus:outline-none"
              {...register("password")}
            />
            <span
              className="absolute z-10 right-5 cursor-pointer"
              onClick={handleTogglePassword}
            >
              {icon}
            </span>
          </div>
          <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
            {errors.password?.message}
          </p>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="text-sm text-[#2F36F4] hover:text-[#5d61d7]"
            onClick={() => setForgotModalVisible(true)}
          >
            Forget password?
          </button>
          <button
            type="button"
            className="text-sm text-[#2F36F4] hover:text-[#5d61d7]"
            onClick={() => setResendModalVisible(true)}
          >
            Resend verification email
          </button>
        </div>

        <button
          type="submit"
          className="bg-[#ED640F] hover:!bg-[#de7c40] text-sm py-3 2xl:py-[18px] 4xl:py-[20px] font-semibold text-white rounded-[10px]"
        >
          {loading ? <Spin /> : <span>Login</span>}
        </button>
        <div className="text-center text-[#52575C] mt-3 4xl:mt-[9px]">
          Don&apos;t have an account?
          <RegisterBtn />
        </div>
      </form>
      <EmailInputModal
        visible={forgotModalVisible}
        onClose={() => setForgotModalVisible(false)}
        onSubmit={handleForgotPassword}
        loading={modalLoading}
        title="Reset Password"
      />

      <EmailInputModal
        visible={resendModalVisible}
        onClose={() => setResendModalVisible(false)}
        onSubmit={handleResendVerification}
        loading={modalLoading}
        title="Resend Verification Email"
      />
    </>
  );
};

export default LoginForm;
