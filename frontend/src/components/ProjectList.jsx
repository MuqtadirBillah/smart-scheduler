import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { setProject as setReduxProject } from "../app/features/project/project"
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

function ProjectList(){

    let dispatch = useDispatch();
    const location = useLocation();
    let baseUrl = useSelector(state=>state.global.value.baseUrl);
    let user = useSelector(state=>state.user.value);
    let projectsData = useSelector(state=>state.project.value);
    let [project, setProject] = useState([]);
    let [projectId, setProjectId] = useState("");

    console.log(useSelector(state=>state.user.value))

    useEffect(()=>{
        setProjectId(location.pathname.split('/')[2])
        axios.get(`${baseUrl}/api/project/${user?._id}`)
        .then(async response=>{
            console.log(response);
            setProject(response.data.data);
            dispatch(setReduxProject(response.data.data));
            console.log(projectsData)
            console.log(response.data.data)
        })
        .catch(err=>{
            console.log(err)
            toast(err)
        })
    }, [])

    useEffect(()=>{
        setProjectId(location.pathname.split('/')[2])
    }, [location])

    return(
        <div className="projectList">
            {
                projectsData?.data.map((p, { index })=>{
                    return(
                        <Link to={`/project/${p._id}`}>
                            {
                                (projectId==p._id) ? 
                                <button className="active">{p.name}</button> :
                                <button className="">{p.name}</button>
                            }
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default ProjectList;
