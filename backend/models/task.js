const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'project name cannot be empty.']
    },
    description: {
        type: String
    },
    start_date: {
        type: String,
        required: [true, 'start date cannot be empty.']
    },
    end_date: {
        type: String,
        required: [true, 'end date cannot be empty.']
    },
    time: {
        type: String
    },
    status: {
        type: String,
        enum : ['pending','complete', 'reopen'],
        default: 'pending'
    },
    creation_date: {
        type: String,
        required: [true, 'creation date cannot be empty.']
    },
    updation_date: {
        type: String
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'project cannot be empty.']
    }
})

module.exports = mongoose.model("Task", taskSchema)