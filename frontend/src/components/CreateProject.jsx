import axios from "axios";
import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProject } from "../app/features/project/project";
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CreateProject(){

    let dispatch = new useDispatch();
    let navigate = useNavigate();
    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let baseUrl = useSelector(state=>state.global.value.baseUrl);
    let projectsData = useSelector(state=>state.project.value.data)

    function createProject(){
        console.log(Cookies.get("userCookie"))
        if(Cookies.get("userCookie")){
            if(name.length && description.length){
                axios.post(`${baseUrl}/api/project/create`, { name: name, description: description }, {
                    headers: {
                        token: Cookies.get("userCookie")
                    }
                })
                .then(response=>{
                    console.log(response);
                    if(response.data.message=="created!"){
                        toast(`Project ${response.data.message}`);
                        dispatch(setProject([...projectsData, response.data.data]))
                        navigate(`/project/${response.data.data._id}`)
                    }
                })
                .catch(err=>{
                    console.log(err);
                    if(err.response.data.error=="project with similar name already exists!"){
                        toast("project with similar name already exists!")
                    }
                })
            }
            else{
                toast('Please fill all fields!')
            }
        }
        else{
            toast('User Cookie not found!')
        }
    }

    return(
        <div className="createProject">
            <div className="container">
                <div className="headings">
                    <h1 className="mainSectionHeading">Create Project</h1>
                    <hr />
                    <div className="row">
                        <div className="form">
                            <div className="col-12">
                                <h5>Name</h5>
                                <input type="text" onChange={(e)=>{setName(e.target.value)}} placeholder="Project Name" />
                                <h5>Description</h5>
                                <textArea type="text" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Project Name" rows="7"></textArea>
                                <button onClick={()=>{createProject()}} className="mainButton">Create Project</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProject;