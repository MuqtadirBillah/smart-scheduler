import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import LogoutBut from "../components/buttons/LogoutBut";
import DynamicHead from "../components/DynamicHead";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../app/features/user/userSlice"
import SettingBut from "../components/buttons/SettingBut";
import ProjectList from "../components/ProjectList";
import CreateProject from "../components/CreateProject";
import CreateProjectBut from "../components/buttons/CreateProjectBut";
import SidePanel from "../components/SidePanel";

function CreateProjectPage(){

    let [display, setDisplay] = useState('hide');
    let user = useSelector((state)=>state.user.value);
    console.log(user)

    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(()=>{
        if(Cookies.get("userCookie")){
            setDisplay("");
        }
        else{
            dispatch(setUser(null));
            navigate("/login");
        }
    }, [])

    return(
        <div className={"createProjectPage d-flex align-items-center "+display}>
            <DynamicHead 
                title="Home"
                description="Control you schedule!"
                keywords=""
                og="og.png"
            />
            <div className="container">
                <div className="row mainTablet">
                    <div className="col-lg-4 col-md-4 col-sm-12 sidePanel">
                        {/* {user?.email}
                        <ProjectList />
                        <CreateProjectBut />
                        <SettingBut />
                        <LogoutBut /> */}
                        <SidePanel />
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 mainPanel">
                        <CreateProject />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProjectPage;