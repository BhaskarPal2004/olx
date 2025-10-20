import { useSelector } from "react-redux";
import { useMemo } from "react";
import {
  AD_API_ENDPOINT,
  AUTH_API_ENDPOINT,
  BUYER_API_ENDPOINT,
  CHAT_API_ENDPOINT,
  ORDER_API_ENDPOINT,
  OTP_API_ENDPOINT,
  PAYMENT_API_ENDPOINT,
  REVIEW_API_ENDPOINT,
  SELLER_API_ENDPOINT,
  SUBSCRIPTION_API_ENDPOINT,
  USER_API_ENDPOINT,
  FOLLOW_API_ENDPOINT,
} from "@/utils/endPoints";
import { createInstance } from "@/utils/axiosInstance";

const useAxiosInstance = () => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  return useMemo(
    () => ({
      authApi: createInstance(AUTH_API_ENDPOINT, false),
      otpApi: createInstance(OTP_API_ENDPOINT, false),
      userApi: createInstance(USER_API_ENDPOINT, accessToken, refreshToken),
      buyerApi: createInstance(BUYER_API_ENDPOINT, accessToken, refreshToken),
      sellerApi: createInstance(SELLER_API_ENDPOINT, accessToken, refreshToken),
      adsApi: createInstance(AD_API_ENDPOINT, accessToken, refreshToken),
      orderApi: createInstance(ORDER_API_ENDPOINT, accessToken, refreshToken),
      orderApiRaw: createInstance(
        ORDER_API_ENDPOINT,
        accessToken,
        refreshToken,
        true,
        false
      ), // new instance for raw response
      reviewApi: createInstance(REVIEW_API_ENDPOINT, accessToken, refreshToken),
      subscriptionApi: createInstance(
        SUBSCRIPTION_API_ENDPOINT,
        accessToken,
        refreshToken
      ),
      chatApi: createInstance(CHAT_API_ENDPOINT, accessToken, refreshToken),
      paymentApi: createInstance(
        PAYMENT_API_ENDPOINT,
        accessToken,
        refreshToken
      ),
      followApi:createInstance(FOLLOW_API_ENDPOINT,accessToken,refreshToken),
    }),
    [accessToken, refreshToken]
  );
};

export default useAxiosInstance;
