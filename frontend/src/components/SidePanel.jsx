import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import CreateProjectBut from './buttons/CreateProjectBut';
import LogoutBut from './buttons/LogoutBut';
import SettingBut from './buttons/SettingBut';
import ProjectList from './ProjectList';

function SidePanel(props){

    let user = useSelector((state)=>state.user.value);

    return(
        <div className="sidePanel">
            <div className="userLabel">
                <i class="fas fa-user-check"></i> {user?.email}
            </div>
            <div className="separator">
                
            </div>
            <ProjectList />
            <CreateProjectBut />
            <hr />
            <SettingBut />
            <LogoutBut />
        </div>
    )
}

export default SidePanel;