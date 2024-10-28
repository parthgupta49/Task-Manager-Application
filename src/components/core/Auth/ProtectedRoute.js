import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user} = useSelector((store)=>store.profile);
    const navigate = useNavigate();

    useEffect(()=>{
        if (user===null){
            navigate("/login");
        }
    },[user,navigate])

    return user === null ? null : children

}

export default ProtectedRoute