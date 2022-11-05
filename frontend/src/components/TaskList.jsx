import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { sortBy}  from "sort-by";
import _ from "underscore";

// material ui 
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import Tooltip from '@mui/material/Tooltip'

function TaskList(props){

    let baseUrl = useSelector(state=>state.global.value.baseUrl);
    let taskChange = useSelector(state=>state.taskChange.value)
    let user = useSelector(state=>state.user.value)
    let [task, setTask] = useState([]);
    let [alltasks, setAllTasks] = useState([]);
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let today = year+`-`+month+'-0'+day
    // let tomorrow = new Date.today().addDays(1).toString("yyyy-mm-dd");
    // console.log(tomorrow)

    const iconStyle = {
        // marginLeft: `2px`,
        // marginRight: `2px`,
        // background: `#22576e`,
        // color: `white`,
        "&:hover": {
            cursor: `pointer`
        }
    }

    useEffect(()=>{
        axios.get(`${baseUrl}/api/task/${props.project_id}`)
        .then(response=>{
            console.log(response);
            setTask(response.data.data);
            setAllTasks(response.data.data);
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
            setAllTasks(response.data.data);
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
                    setAllTasks(response.data.data);
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
                setAllTasks(response.data.data);
                setTask(response.data.data);
            })
            .catch(err=>{
                console.log(err)
                toast(err)
            })
        })
        .catch(err=>console.log(err))
    }

    async function sortByAscendingName(){
        await setTask(alltasks)
        await setTask([...alltasks].sort((a, b) => a.name.split(" ")[0].toLowerCase() < b.name.split(" ")[0].toLowerCase() ? -1 : 1 ))
    }
    async function sortByDecendingName(){
        await setTask(alltasks)
        await setTask([...alltasks].sort((a, b) => a.name.split(" ")[0].toLowerCase() < b.name.split(" ")[0].toLowerCase() ? 1 : -1 ))
    }

    function searchKeyword(e){
        setTask(alltasks)
        if(e.target.value.length){
            const filtered = [...alltasks].filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(e.target.value)));
            console.log(filtered);
            setTask(filtered)
        }
        else{
            setTask(alltasks)
        }
    }

    function searchToday(e){
        setTask(alltasks)
        console.log(e)
        if(e){
            const filtered = task.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(e)));
            console.log(filtered);
            if(filtered.length){
                setTask(filtered)
            }
            else{
                toast(`No task for today!`)
            }
        }
        else{
            setTask(alltasks)
        }
    }

    // function searchDate(e){
    //     if(e.target.value.length){
    //         const filtered = task.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(e.target.value)));
    //         console.log(filtered);
    //         setTask(filtered)
    //     }
    //     else{
    //         setTask(alltasks)
    //     }
    // }

    return(
        <div className="taskList">
            <div className="container">
                <div className="filters">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 coll searchCol">
                            <div className="search">
                                <input type="text" placeholder='search task' onChange={ (e)=>searchKeyword(e) } />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 coll controlsCol">
                            <span className='controls' onClick={ ()=>searchToday(today) }>
                                <Tooltip title="view latest first">
                                    <>Today <i className="fas fa-calendar-day"></i></>
                                </Tooltip>
                            </span>
                            <span className='controls' onClick={ ()=>sortByAscendingName() }>
                                <Tooltip title="view latest first">
                                    <i className="fas fa-sort-alpha-down"></i>
                                </Tooltip>
                            </span>
                            <span className='controls' onClick={ ()=>sortByDecendingName() }>
                                <Tooltip title="view latest first">
                                    <i className="fas fa-sort-alpha-down-alt"></i>
                                </Tooltip>
                            </span>
                        </div>
                        {/* <span>
                            <Tooltip title="view latest first">
                                <SortIcon style={iconStyle} onClick={ ()=>sortByAscendingName() }/>
                            </Tooltip>
                        </span> */}
                    </div>
                </div>
                <div className="row">
                {
                    task?.map((t, { index })=>{
                        return(
                            <div className="col-12 singleTask" key={index}>
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
                {
                    !task?.length && <><hr /><h5>No record found!</h5></>
                }
                </div>
            </div>
            <div className="row">
                
            </div>
        </div>
    )
}

export default TaskList;