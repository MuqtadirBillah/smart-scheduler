import React from "react";
import { Link } from "react-router-dom";

function SettingBut(){
    return(
        <div className="settingButton">
            <Link to="/settings"><button><i className="fas fa-cogs"></i> Settings</button></Link>
        </div>
    )
}

export default SettingBut;