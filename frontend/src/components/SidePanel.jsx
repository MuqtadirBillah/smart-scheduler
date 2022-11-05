import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import CreateProjectBut from './buttons/CreateProjectBut';
import LogoutBut from './buttons/LogoutBut';
import SettingBut from './buttons/SettingBut';
import ProjectList from './ProjectList';
import { useMediaQuery } from 'react-responsive'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

function SidePanel(props){

    let user = useSelector((state)=>state.user.value);
    let [display, setDisplay] = useState("");
    let [displayState, setDisplayState] = useState(false)
    
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(()=>{
        if(isTabletOrMobile){
            setDisplay("none")
        }
        else{
            setDisplay("")
        }
    }, [])

    useEffect(()=>{
        if(displayState){
            setDisplay("none")
        }
        else{
            setDisplay("")
        }
    }, [displayState])

    return(
        <div className="sidePanel">
            <div className="openBut">
                <i className="fas fa-bars" onClick={()=>setDisplayState(!displayState)}></i>
            </div>
            <div className={"elements"+isTabletOrMobile && 'slideInDown'} style={{ display: `${display}` }}>
                <div className="headers">
                    <div className="userLabel row">
                        <div className="col-2">
                            <Avatar sx={{ boxShadow: `2px 2px 10px 1px rgba(0,0,0,0.3)`, bgcolor: `#122E3A` }}>{user?.email[0]}</Avatar>
                            {/* <Avatar sx={{ boxShadow: `2px 2px 10px 1px rgba(0,0,0,0.3)`, bgcolor: `#${Math.floor(Math.random() * 0xFFFFFF).toString(16)}` }}>{user?.email[0]}</Avatar> */}
                        </div>
                        <div className="col-10 align-self-center">
                            {user?.email.split("@")[0]}
                        </div>
                        {/* <i class="fas fa-user-check"></i> {user?.email} */}
                    </div>
                </div>
                <div className="separator">
                </div>
                <ProjectList />
                <CreateProjectBut />
                <hr />
                <SettingBut />
                <LogoutBut />
            </div>
        </div>
    )
}

export default SidePanel;