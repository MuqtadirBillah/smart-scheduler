import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';

function TaskList(props){

    let baseUrl = useSelector(state=>state.global.value.baseUrl);
    let taskChange = useSelector(state=>state.taskChange.value)
    let user = useSelector(state=>state.user.value)
    let [task, setTask] = useState([]);

    useEffect(()=>{
        axios.get(`${baseUrl}/api/task/${props.project_id}`)
        .then(response=>{
            console.log(response);
            setTask(response.data.data);
        })
        .catch(err=>{
            console.log(err)
            toast(err)
        })
    }, [props.project_id])

    useEffect(()=>{
        console.log(`Task changing to ${taskChange}`)
        axios.get(`${baseUrl}/api/task/${props.project_id}`)
        .then(response=>{
            console.log(response);
            setTask(response.data.data);
        })
        .catch(err=>{
            console.log(err)
            toast(err)
        })
    }, [taskChange])

    function deleteTask(id){
        axios.delete(`${baseUrl}/api/task/delete/${id}`)
        .then((response)=>{
            console.log(response)
            if(response.data.message=='deleted!'){
                toast(`Task deleted!`)
                axios.get(`${baseUrl}/api/task/${props.project_id}`)
                .then(response=>{
                    console.log(response);
                    setTask(response.data.data);
                })
                .catch(err=>{
                    console.log(err)
                    toast(err)
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    function updateStatus(status, id){
        axios.post(`${baseUrl}/api/task/update/status`, {
            status: status,
            id: id
        })
        .then(response=>{
            console.log(response.data.message);
            toast(response.data.message);
            axios.get(`${baseUrl}/api/task/${props.project_id}`)
            .then(response=>{
                console.log(response);
                setTask(response.data.data);
            })
            .catch(err=>{
                console.log(err)
                toast(err)
            })
        })
        .catch(err=>console.log(err))
    }

    return(
        <div className="taskList">
            <div className="container">
                <div className="row">
                {
                    task?.map((t)=>{
                        return(
                            <div className="col-12 singleTask">
                                <h4>{t.name} <button className="deleteBut" onClick={()=>deleteTask(t._id)}><i className="fas fa-trash"></i> delete</button></h4>
                                <p>Start date: {t.start_date} - End date: {t.end_date}</p>
                                {/* <select name="" id="">
                                    <option value="">
                                        Pending
                                    </option>
                                </select> */}
                                <div className="dropdown">
                                    <button className={`btn btn-secondary dropdown-toggle ${t.status}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {t.status}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        {
                                            (t.status!='pending') &&
                                            <li><span className="dropdown-item" onClick={()=>{updateStatus('pending', t._id)}}>pending</span></li>
                                        }
                                        {
                                            (t.status!='complete') &&
                                            <li><span className="dropdown-item" onClick={()=>{updateStatus('complete', t._id)}}>complete</span></li>
                                        }
                                        {
                                            (t.status!='reopen') &&
                                            <li><span className="dropdown-item" onClick={()=>{updateStatus('reopen', t._id)}}>reopen</span></li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <div className="row">
                
            </div>
        </div>
    )
}

export default TaskList;