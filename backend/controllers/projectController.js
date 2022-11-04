const { handleResponseWithStatus } = require('../helpers/utils');
const Project = require('../models/project')

const getAllProjects = (req, res) =>{
    Project.find({}).populate("user").exec((err, data)=>{
        if(err){
            console.log(err);
            handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
        }
        else{
            handleResponseWithStatus(res, 200, true, "", { data: data, status: "success" });
        }
    })
}

const getProjectByUserId = (req, res) =>{
    console.log(req.params)
    Project.find({ user: req.params.id }).populate("user").exec((err, data)=>{
        if(err){
            console.log(err);
            handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
        }
        else{
            handleResponseWithStatus(res, 200, true, "", { data: data, status: "success" });
        }
    })
}

const getProjectById = (req, res)=>{
    Project.find({ _id: req.params.id }).populate("user").exec((err, data)=>{
        if(err){
            console.log(err);
            handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
        }
        else{
            handleResponseWithStatus(res, 200, true, "", { data: data, status: "success" });
        }
    })
}

const createProject = (req, res)=>{
    let { _id:id, email } = res.locals;
    Project.find({ name: req.body.name, user: id }, (err, currentProjects)=>{
        if(err){
            console.log(err);
            handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
        }
        else{
            if(currentProjects.length){
                handleResponseWithStatus(res, 500, false, 'project with similar name already exists!', { status: "error", error: 'project with similar name already exists!' });   
            }
            else{
                req.body.creation_date = new Date();
                req.body.user = id
                let project = new Project(req.body)
                project.save()
                .then((data)=>{
                    handleResponseWithStatus(res, 200, true, "", { data: data, message: "created!", status: "success" });
                })
                .catch(err=>{
                    console.log(err);
                    handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
                })
            }
        }
    })
}

const deleteProjectById = (req, res)=>{
    let { _id:id, email } = res.locals;
    Project.find({ _id: req.params.id }, (err, currentProjects)=>{
        if(err){
            console.log(err);
            handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
        }
        else{
            if(currentProjects.length){
                Project.deleteOne({ _id: req.params.id })
                .then(()=>{
                    handleResponseWithStatus(res, 200, true, "", { message: "deleted!", status: "success" });
                })
                .catch(err=>{
                    handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
                })
            }
            else{
                handleResponseWithStatus(res, 404, false, "project not found", { status: "error", error: "project not found" });   
            }
        }
    })
}

module.exports = {
    getAllProjects,
    getProjectById,
    getProjectByUserId,
    createProject,
    deleteProjectById
}