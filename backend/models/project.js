const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'project name cannot be empty.']
    },
    description: {
        type: String
    },
    creation_date: {
        type: String,
        required: [true, 'creation date cannot be empty.']
    },
    updation_date: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user cannot be empty.']
    }
})

module.exports = mongoose.model("Project", projectSchema);