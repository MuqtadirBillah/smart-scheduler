const { handleResponseWithStatus } = require("../helpers/utils");
const Task = require("../models/task");

const getAllTasks = (req, res) => {
    Task.find({}).populate({ path: 'project', populate: { path: 'user' } }).exec((err, data)=>{
        if(err){
            console.log(err);
            handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
        }
        else{
            handleResponseWithStatus(res, 200, true, "", { data: data, status: "success" });
        }
    })
}

const getTaskById = (req, res) => {
    Task.find({ _id: req.params.id }).populate({ path: 'project', populate: { path: 'user' } }).exec((err, data)=>{
        if(err){
            console.log(err);
            handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
        }
        else{
            handleResponseWithStatus(res, 200, true, "", { data: data, status: "success" });
        }
    })
}

const getTaskByProjectId = (req, res) => {
    Task.find({ project: req.params.id }).populate({ path: 'project', populate: { path: 'user' } }).exec((err, data)=>{
        if(err){
            console.log(err);
            handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
        }
        else{
            handleResponseWithStatus(res, 200, true, "", { data: data, status: "success" });
        }
    })
}

const createTask = (req, res)=>{
    let { id, email } = res.locals;

    Task.find({ name: req.body.name, project: req.body.project }, (err, projectData)=>{
        if(err){
            console.log(err);
            handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
        }
        else{
            if(projectData.length){
                handleResponseWithStatus(res, 420, false, "task already exists!", { status: "error", error: "task already exists!" });   
            }
            else{
                req.body.creation_date = new Date();
                let task = new Task(req.body)
                task.save()
                .then((newTask)=>{
                    handleResponseWithStatus(res, 200, true, "", { message: "created!", data: newTask, status: "success" });
                })
                .catch((error)=>{
                    console.log(error)
                    handleResponseWithStatus(res, 500, false, error, { status: "error", error: error });   
                })
            }
        }
    })
}

const updateStatus = (req, res)=>{
    Task.updateOne({ _id: req.body.id }, { status: req.body.status })
    .then(data=>{
        handleResponseWithStatus(res, 200, true, "", { message: 'updated!', status: "success" });
    })
    .catch(err=>{
        console.log(err);
        handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
    })
}

const deleteTaskById = (req, res) => {
    Task.find({ _id: req.params.id }).populate({ path: 'project', populate: { path: 'user' } }).exec((err, data)=>{
        if(err){
            console.log(err);
            handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
        }
        else{
            if(data.length){
                Task.deleteOne({ _id: req.params.id })
                .then(()=>{
                    handleResponseWithStatus(res, 200, true, "", { message: 'deleted!', status: "success" });
                })
                .catch(err=>{
                    handleResponseWithStatus(res, 500, false, err, { status: "error", error: err });   
                })
            }
        }
    })
}

module.exports = {
    getAllTasks,
    getTaskById,
    getTaskByProjectId,
    createTask,
    updateStatus,
    deleteTaskById
}