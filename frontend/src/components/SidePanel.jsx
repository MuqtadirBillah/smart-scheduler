import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import CreateProjectBut from './buttons/CreateProjectBut';
import LogoutBut from './buttons/LogoutBut';
import SettingBut from './buttons/SettingBut';
import ProjectList from './ProjectList';
import { useMediaQuery } from 'react-responsive'

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
                    <div className="userLabel">
                        <i class="fas fa-user-check"></i> {user?.email}
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