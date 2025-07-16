const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    priority:{
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    status:{
        type:String,
        enum: ['todo','inProgress','done'],
        default:'todo'
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', required: true 
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    },
},{timestamps:true})

module.exports = mongoose.model('Task', taskSchema)