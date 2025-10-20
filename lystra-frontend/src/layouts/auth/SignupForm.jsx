import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/src/yup";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "@/validations/auth/signupValidation";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setRegisterRole } from "@/store/slices/authSlice";
import useAxiosInstance from "@/hooks/useAxiosInstance";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<EyeOff />);

  const { authApi } = useAxiosInstance();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });
  const { registerRole } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);

  const onSubmit = async (data, e) => {
    try {
      dispatch(setLoading(true));
      data.phoneNumber = data.phoneNumber + "";
      const res = await authApi.post(`/signup/${registerRole}`, data);
      if (res?.success) {
        toast.success(res.message);
        toast(res.advice);
        dispatch(setRegisterRole(null));
        navigate("/auth/login");
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.response.data);
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

  return (
    <>
      <h2 className="font-medium text-xl 2xl:text-[35px] 4xl:text-[40px] 2xl:mb-2 4xl:mb-[46px] capitalize">
        Create {registerRole} Account
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-5 2xl:px-[108px] 4xl:px-[100px] flex flex-col gap-1 2xl:gap-2"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-[#52575C]">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            className="border border-[#DDDDDD] py-2 2xl:py-5 4xl:pt-[19px] px-6 rounded-[10px] placeholder:text-[#B0B3B6] focus:outline-none"
            {...register("name")}
          />
          <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-[#52575C]">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            className="border border-[#DDDDDD] py-2 2xl:py-5 4xl:pt-[19px] px-6 rounded-[10px] placeholder:text-[#B0B3B6] focus:outline-none"
            {...register("email")}
          />
          <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
            {errors.email?.message}
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="mb-2 text-[#52575C]">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="phoneNumber"
            placeholder="Enter phone number"
            className="border border-[#DDDDDD] py-2 2xl:py-5 4xl:pt-[19px] px-6 rounded-[10px] placeholder:text-[#B0B3B6] focus:outline-none"
            {...register("phoneNumber")}
          />
          <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
            {errors.phoneNumber?.message}
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
              className="border border-[#DDDDDD] py-2 2xl:py-5 4xl:pt-[19px] px-6 rounded-[10px] w-full placeholder:text-[#B0B3B6] focus:outline-none"
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
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="mb-2 text-[#52575C]">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type={type}
            name="confirmPassword"
            placeholder="Enter confirm password"
            className="border border-[#DDDDDD] py-3 2xl:py-5 4xl:pt-[19px] px-6 rounded-[10px] placeholder:text-[#B0B3B6] focus:outline-none"
            {...register("confirmPassword")}
          />
          <p className="text-red-600 text-xs font-semibold h-5 2xl:h-3 pt-1 ps-1">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <button
          type="submit"
          className="bg-[#ED640F] hover:!bg-[#de7c40] text-sm py-3 2xl:py-[18px] mt-5 2xl:mt-6 4xl:mt-[26px] mb-3 font-semibold text-white rounded-[10px]"
        >
          {loading ? <Spin /> : <span>Sign up</span>}
        </button>
        <p>
          Already have an account?{" "}
          <Link
            to={"/auth/login"}
            className="text-[#2F36F4] hover:text-[#5d61d7]"
          >
            Login?
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignupForm;
