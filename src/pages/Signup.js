import Template  from "../components/core/Auth/Template";
import signupImage from '../assets/Images/signup.webp';
function Signup() {
    return (
        <Template
            title={"Signup"}
            description1={"Register with us"}
            description2={"Enter user details"}
            formType={"signup"}
            image={signupImage}
        />
    )
}
export default Signup;