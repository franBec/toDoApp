const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    text: String,
    isDone: Boolean
})

const Task = mongoose.model('Task', taskSchema, 'tasks')

module.exports = Task;