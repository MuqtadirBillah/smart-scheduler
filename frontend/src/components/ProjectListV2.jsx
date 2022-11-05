import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { setProject as setReduxProject } from "../app/features/project/project"
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

function ProjectListV2(){

    let dispatch = useDispatch();
    const location = useLocation();
    let baseUrl = useSelector(state=>state.global.value.baseUrl);
    let user = useSelector(state=>state.user.value);
    let projectsData = useSelector(state=>state.project.value);
    let [project, setProject] = useState([]);
    let [projectId, setProjectId] = useState("");

    console.log(useSelector(state=>state.user.value))

    useEffect(()=>{
        if(Cookies.get(`userCookie`)){
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
        }
    }, [])

    useEffect(()=>{
        setProjectId(location.pathname.split('/')[2])
    }, [location])

    return(
        <div className="projectList">
            <div className="container">
                <div className="headings">
                    <h2 className='mainSectionHeading'>All Projects</h2>
                    <hr />
                </div>
                <div className="row">
                    <div className="allProjects">
                        {
                            projectsData?.data.map((p, { index })=>{
                                return(
                                    <div className="singleProject">
                                        <Link to={`/project/${p._id}`}>
                                            <h4>{p.name}</h4>
                                        </Link>
                                        <p>{p.description}
                                        <br />{` Created at: ${p.creation_date.split(" ")[0]} ${p.creation_date.split(" ")[1]} ${p.creation_date.split(" ")[2]} ${p.creation_date.split(" ")[3]}`}</p>
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectListV2;
