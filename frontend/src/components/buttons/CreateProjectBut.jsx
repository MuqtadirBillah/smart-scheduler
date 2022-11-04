import React from 'react';
import { Link } from "react-router-dom";

function CreateProjectBut(){
    return(
        <div className="createProjectBut">
            <Link to="/project/create"><button className=""><i className="fas fa-plus"></i> Create Project</button></Link>
        </div>
    )
}

export default CreateProjectBut;