import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLogin as googleLoginThunk } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const responseGoogle = async (authResult) => {
    try {
      console.log("authResult", authResult);
      if (authResult["code"]) {
        dispatch(googleLoginThunk({code: authResult.code}));
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <>
      <div className="my-4 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">or</span>
        </div>
      </div>

      <button
        type="button"
        onClick={googleLogin}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 rounded-md text-gray-700 font-semibold hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        <Image
          src="/google-icon.svg" // Make sure you have this icon in your public folder
          alt="Google"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        Continue with Google
      </button>
    </>
  );
};

export default GoogleLogin;
