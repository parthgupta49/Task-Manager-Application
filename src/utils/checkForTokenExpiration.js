import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckForTokenExpiration = (message,toastId,navigate)=>{
    if (message == 'Token has expired. Please log in again.'){
        if(toastId){
            toast.dismiss(toastId)
        }
        navigate('/login');
    }
    return;
}
export default CheckForTokenExpiration