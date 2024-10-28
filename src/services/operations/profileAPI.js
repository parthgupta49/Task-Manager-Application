import { setLoading, setUser } from '../../slices/profileSlice';
import { setToken } from '../../slices/authSlice';
import { profileEndpoints, settingsEndpoints } from '../apis';
import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
const { CHANGE_PASSWORD_API, UPDATE_DISPLAY_PICTURE_API, DELETE_PROFILE_API, UPDATE_PROFILE_API } = settingsEndpoints;
const { GET_USER_ENROLLED_COURSES_API } = profileEndpoints


export function updatePassword(oldPassword, newPassword, confirmNewPassword) {
    return async (dispatch) => {
        // console.log(token)
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CHANGE_PASSWORD_API, { oldPassword, newPassword, confirmNewPassword }, null, null, true);
            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Successfully updated the password")
        } catch (error) {
            console.log("Update PASSWORD API ERROR", error.response);
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export function updateProfilePicture(displayPicture) {
    return async (dispatch) => {
        console.log("UPDATE PROFILE FRONTEND dp : ", displayPicture);
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, displayPicture, null, null, true);
            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setUser(response.data.user));
            localStorage.setItem('user', JSON.stringify(response?.data?.user));
            toast.success("Successfully updated the profile picture")
        } catch (error) {
            console.log("ERROR UPDATING PROFILE PICTURE API", error)
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export function deleteAccount(navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        console.log(navigate);
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, null, null, true);
            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setUser(null));
            dispatch(setToken(null));
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
            toast.success("Account Deleted Successfully")
            console.log("ACCOUNT DELETED");
            navigate("/");
        } catch (error) {
            console.log("DELETE ACCOUNT API ERROR : ", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export function editMyProfile(dateOfBirth, about, gender) {
    return async (dispatch) => {
        console.table([dateOfBirth, about, gender]);
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, { dateOfBirth, about, gender }, null, null, true)
            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setUser(response.data.user));
            localStorage.setItem('user', JSON.stringify(response?.data?.user));
            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log("ERROR UPDATING PROFILE API", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export async function getUserEnrolledCourses() {
        const toastId = toast.loading("Loading...");
        let result = [];
        try {
            const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null, null, null, true);
            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            result = response?.data?.courses;
            toast.success("Courses Retrieved Successfully")
        } catch (error) {
            console.log("ERROR GETTING ENROLLED COURSES API", error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
        return result;

}