import { Route } from "react-router-dom";
import AuthPage from "@/pages/auth/AuthPage";
import EmailVerifyPage from "@/pages/auth/EmailVerificationPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

const AuthRoutes = () => {
  return (
    <>
      <Route path="signup" element={<AuthPage isSignup={true} />} />
      <Route path="login" element={<AuthPage isLogin={true} />} />
      <Route
        path="verify/:token"
        element={<EmailVerifyPage isSignup={true} />}
      />
      <Route path="verify/otp/:otpToken" element={<AuthPage isOtp={true} />} />
      <Route
        path="passwordVerify/:forgotPasswordToken"
        element={<ResetPasswordPage />}
      />
    </>
  );
};

export default AuthRoutes;
