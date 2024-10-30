import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setTasks } from "../../slices/taskSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    GOOGLE_AUTH_API,
    GOOGLE_AUTH_LOGIN_API
} = endpoints;

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });
            console.log("SENDOTP API RESPONSE............", response);

            console.log(response.data.success);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully");
            navigate("/verify-email");
            console.log("navigation is here");
        } catch (error) {
            console.log("SENDOTP API ERROR............", error);
            toast.error("Could Not Send OTP");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function signUp(
    firstname,
    lastname,
    email,
    password = "",
    confirmPassword = "",
    otp = "",
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstname,
                lastname,
                email,
                password,
                confirmPassword,
                otp,
            });
            console.log("SIGNUP API RESPONSE............", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            console.log("SIGNUP API ERROR............", error?.response?.data);
            toast.error("Signup Failed" + error?.response?.data?.message);
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

export function googleSignUp(firstname, lastname, email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", GOOGLE_AUTH_API, { firstname, lastname, email });
            console.log("GOOGLE SIGNUP API RESPONSE............", response);
            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }
            toast.success("Signup Successful");
            navigate("/login");
        } catch (error) {
            console.log("GOOGLE SIGNUP API ERROR............", error?.response?.data);
            toast.error("Signup Failed" + error?.response?.data?.message);
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            }
                , null, null, true);

            console.log("LOGIN API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successful")
            dispatch(setToken(response?.data?.user?.token));
            const userImage = response?.data?.user?.image
                ? response?.data?.user?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.user?.firstName} ${response?.data?.user?.lastName}`;
            dispatch(setUser({ ...response?.data?.user, image: userImage }));

            // localStorage.setItem(
            //     "token",
            //     JSON.stringify(response?.data?.user?.token)
            // );
            localStorage.setItem("user", JSON.stringify(response.data.user));
            dispatch(setTasks(response?.data?.user?.tasks))
            localStorage.setItem('tasks', JSON.stringify(response?.data?.user?.tasks));
            // document.cookie = `token=${response?.data?.user?.token}; path=/;`;
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.log("LOGIN API ERROR............", error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}
export function googleLogIn(email, navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", GOOGLE_AUTH_LOGIN_API, { email }, null, null, true);
            console.log("GOOGLE LOGIN API RESPONSE............", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Login Successful")
            const userImage = response?.data?.user?.image
                ? response?.data?.user?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.data?.user?.firstName} ${response?.data?.user?.lastName}`;
            localStorage.setItem("user", JSON.stringify(response.data.user));
            dispatch(setUser({ ...response?.data?.user, image: userImage }));
            localStorage.setItem('tasks', JSON.stringify(response?.data?.user?.tasks));
            dispatch(setTasks(response?.data?.user?.tasks))
            navigate("/dashboard/my-profile");
        }
        catch (error) {
            console.log("GOOGLE LOGIN API ERROR............", error);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setTasks(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("tasks");
        // document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
        // toast.success("Logged Out");
        navigate("/");
    };
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            });
            console.log("PASSWORD RESET API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        } catch (error) {
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Failed to Send the reset password token");
        }
        dispatch(setLoading(false));
    };
}

// once the password is reset, navigate the user to login page
export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            });
            console.log("RESET PASSWORD API RESPONSE............", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Password Reset Successfully");
            navigate("/login");
        } catch (error) {
            console.log("RESET PASSWORD FAILED", error);
            toast.error("Couldn't update password");
        }
        dispatch(setLoading(false));
    };
}
