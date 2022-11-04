import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import CreateTaskComp from "./CreateTaskComp";

function ProjectHeader(props){

    var [project, setProject] = useState();
    let baseUrl = useSelector(state=>state.global.value.baseUrl);
    let navigate = useNavigate();

    useEffect(()=>{
        setProject(props.project);
    } ,[props])

    console.log(props)

    function deleteProject(){
        axios.delete(`${baseUrl}/api/project/delete/${props.project._id}`, {
            headers: {
                token: Cookies.get("userCookie")
            }
        })
        .then(response=>{
            console.log(response);
            if(response.data.message=='deleted!'){
                navigate("/");
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="projectHeader">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7">
                        <h4>
                            {project?.name}
                        </h4>
                    </div>
                    <div className="col-1">
                        <h4>
                            <i className="fas fa-cog"></i>
                        </h4>
                    </div>
                    <div className="col-2">
                        <CreateTaskComp project_id={props.project_id} detectChange={props.detectChange}/>
                        <button className="mainBut" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        +
                        </button>
                        {/* <button className="mainBut">+</button> */}
                    </div>
                    <div className="col-2">
                        <button className="deleteBut" onClick={ ()=> deleteProject() }>Delete</button>
                    </div>
                </div>
            </div>
            <div className="separator">

            </div>
        </div>
    )
}

export default ProjectHeader;