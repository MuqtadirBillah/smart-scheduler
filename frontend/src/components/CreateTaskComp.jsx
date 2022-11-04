import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import axios from "axios";
import { setTaskChange } from "../app/features/task/taskChangeSlice";

function CreateTaskComp(props){

    let dispatch = useDispatch();
    let baseUrl = useSelector(state=>state.global.value.baseUrl)
    let taskChange = useSelector(state=>state.taskChange.value)
    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    let [time, setTime] = useState("");

    function createTask(){
        axios.post(`${baseUrl}/api/task/create`, {
          project: props.project_id, name: name, description: description, start_date: startDate, end_date: endDate, time: time  
        }, {
            headers: {
                token: Cookies.get("userCookie")
            }
        })
        .then(response=>{
            console.log(response.data);
            dispatch(setTaskChange());
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="createTaskComp">
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Create task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form">
                            <div className="row">
                                <div className="col-12">
                                    <h6>Name</h6>
                                    <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Name" />
                                </div>
                                <div className="col-12">
                                    <h6>Description</h6>
                                    <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description} placeholder="Description" />
                                </div>
                                <div className="col-12">
                                    <h6>Start date</h6>
                                    <input type="date" onChange={(e)=>setStartDate(e.target.value)} placeholder="Description" />
                                </div>
                                <div className="col-12">
                                    <h6>End date</h6>
                                    <input type="date" onChange={e=>setEndDate(e.target.value)} placeholder="Description" />
                                </div>
                                <div className="col-12">
                                    <h6>Time</h6>
                                    <input type="time" onChange={e=>setTime(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>createTask()}>Create</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTaskComp;