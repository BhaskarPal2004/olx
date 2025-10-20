import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast from "react-hot-toast";
import { AUTH_API_ENDPOINT } from "@/utils/endPoints";

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password should contain upper case")
    .matches(/[a-z]/, "Password should contain lower case")
    .matches(/[0-9]/, "Password should contain number")
    .matches(
      /[-._!"`'#%&,:;<>=@{}~$()*+/\\?[\]^|]+/,
      "Password should contain special character"
    ),

  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPasswordPage = () => {
  const { forgotPasswordToken } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${AUTH_API_ENDPOINT}/resetPassword/${forgotPasswordToken}`,
        {
          password: data.password,
          confirmPassword: data.confirmPassword, // ✅ send both
        }
      );

      toast.success(res.data.message || "Password reset successful");
      navigate(`/auth/login`);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-20 px-4">
      <h2 className="text-3xl font-semibold mb-6">Reset Your Password</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            {...register("password")}
            className="border px-4 py-2 rounded"
            placeholder="Enter new password"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="border px-4 py-2 rounded"
            placeholder="Confirm new password"
          />
          <p className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
