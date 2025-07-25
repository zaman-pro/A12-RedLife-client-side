import toast from "react-hot-toast";
import { saveUserInDb } from "../api/utils";

export const handleGoogleLogin = async (googleLoginFn) => {
  try {
    await toast.promise(
      async () => {
        const res = await googleLoginFn();
        const loggedInUser = res.user;

        const userData = {
          name: loggedInUser?.displayName,
          email: loggedInUser?.email,
          photo: loggedInUser?.photoURL,
        };

        await saveUserInDb(userData);
      },
      {
        loading: "Logging in with Google",
        success: "Logged in successfully!",
        error: "Google login failed. Please try again.",
      }
    );
  } catch (err) {
    console.error("Google Login Error:", err);
    toast.error(err.message || "Unexpected Google login error.");
  }
};
