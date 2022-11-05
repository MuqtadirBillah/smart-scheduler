import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import axios from "axios";
import { setTaskChange } from "../app/features/task/taskChangeSlice";
import { toast } from 'react-toastify';

function CreateTaskComp(props){

    let dispatch = useDispatch();
    let baseUrl = useSelector(state=>state.global.value.baseUrl)
    let taskChange = useSelector(state=>state.taskChange.value)
    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    let [time, setTime] = useState("");
    const [open, setOpen] = useState(false);

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      pt: 2,
      px: 4,
      pb: 3,
    };

    const boxStyle = {
        ...style,
        width: `60%`,
        borderRadius: `5px`,
        ['@media (max-width:780px)']:
            {
                width: '95%'
            }
    }

    const inputStyle = {
        width: `100%`,
        height: `35px`,
        padding: `5px`
    }

    const formHeading = {
        marginTop: `10px`
    }

    const createButStyle = {
        backgroundColor: '#22576e',
        marginTop: `15px`,
        border: `0px`,
        color: `white`,
        padding: `5px 10px`,
        borderRadius: `2px`,
        '&:hover': {
            background: `#122E3A`
        }
    }
    const closeButStyle = {
        backgroundColor: 'red',
        marginTop: `15px`,
        border: `0px`,
        color: `white`,
        padding: `5px 10px`,
        borderRadius: `2px`,
        marginRight: '3px',
        '&:hover': {
            background: `#122E3A`
        }
    }

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    function createTask(){
        if(name!='' && description!='' && startDate!='' && endDate!=''){
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
                setOpen(false)
                toast(`${name} created successfully!`);
                setName(``);
                setDescription(``);
                setStartDate(``);
                setEndDate(``);
                setTime(``);
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            toast('Please fill all fields!')
        }
    }

    return(
        <div className="createTaskComp">
            {/* <button className="mainBut" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            +
            </button> */}
            <button className="mainBut" onClick={()=>setOpen(true)}>+</button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={boxStyle} className="createTaskModal">
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <div className="form">
                        <div className="row">
                            <div className="col-12">
                                <h6 style={formHeading}>Name</h6>
                                <input type="text" style={inputStyle} onChange={(e)=>setName(e.target.value)} value={name} placeholder="Name" />
                            </div>
                            <div className="col-12">
                                <h6 style={formHeading}>Description</h6>
                                <input type="text" style={inputStyle} onChange={(e)=>setDescription(e.target.value)} value={description} placeholder="Description" />
                            </div>
                            <div className="col-12">
                                <h6 style={formHeading}>Start date</h6>
                                <input type="date" style={inputStyle} onChange={(e)=>setStartDate(e.target.value)} placeholder="Description" />
                            </div>
                            <div className="col-12">
                                <h6 style={formHeading}>End date</h6>
                                <input type="date" style={inputStyle} onChange={e=>setEndDate(e.target.value)} placeholder="Description" />
                            </div>
                            <div className="col-12">
                                <h6 style={formHeading}>Time</h6>
                                <input type="time" style={inputStyle} onChange={e=>setTime(e.target.value)} />
                            </div>
                            <div className="col-12">
                                <button style={closeButStyle} onClick={()=>setOpen(false)}>Close</button>
                                <button style={createButStyle} onClick={()=>createTask()}>Create Task</button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
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