import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImage from '../assets/Images/login.webp'
function Login() {
    return (
        <Template
            title={"Login Form"}
            description1={"Manage Your Tasks"}
            description2={"Handle your Tasks in our all-in-one application"}
            image={loginImage}
            formType={"login"}
        />

    )
}

export default Login