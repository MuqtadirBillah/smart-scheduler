import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../app/features/user/userSlice"

function LogoutBut(){

    let dispatch = useDispatch();
    let navigate = useNavigate();

    function logout(){
        Cookies.remove("userCookie");
        dispatch(setUser(null));
        navigate("/login");
    }

    return(
        <div className="logoutButton">
            <button onClick={()=>{logout()}}><i className="fas fa-sign-out-alt"></i> Logout</button>
        </div>
    )
}

export default LogoutBut;