import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LogoutBut from "../components/buttons/LogoutBut";
import DynamicHead from "../components/DynamicHead";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../app/features/user/userSlice"
import SettingBut from "../components/buttons/SettingBut";
import ProjectList from "../components/ProjectList";
import CreateProject from "../components/CreateProject";
import TaskList from "../components/TaskList";
import ProjectHeader from "../components/ProjectHeader";
import SidePanel from "../components/SidePanel";
import { useMediaQuery } from 'react-responsive'

function Project(){

    let [display, setDisplay] = useState('hide');
    let user = useSelector((state)=>state.user.value);
    let baseUrl = useSelector((state)=>state.global.value.baseUrl);
    let [projectId, setProjectId] = useState("");
    let [projectDetails, setProjectDetails] = useState();

    const location = useLocation();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(()=>{
        setProjectId(location.pathname.split('/')[2])
        if(Cookies.get("userCookie")){
            setDisplay("");
            axios.get(`${baseUrl}/api/project/get/${location.pathname.split('/')[2]}`)
            .then(response=>{
                console.log(response.data.data[0])
                setProjectDetails(response.data.data[0])
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            dispatch(setUser(null));
            navigate("/login");
        }
    }, [location]);

    return(
        // <div className={"project d-flex align-items-center "+display}>
        <div className={`project ${ !isTabletOrMobile && 'd-flex align-items-center' } ${display}`}>
            <DynamicHead 
                title="View Project"
                description="Control you schedule!"
                keywords=""
                og="og.png"
            />
            <div className="container">
                <div className="row mainTablet">
                    <div className="col-lg-4 col-md-4 col-sm-12 sidePanel">
                        <SidePanel />
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 mainPanel">
                        <ProjectHeader project={projectDetails} project_id={location.pathname.split('/')[2]} />
                        <TaskList project_id={projectId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project;