const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.get('/', async (req, res)=>{
    try {
        const tasksArrayDB = await Task.find()
        res.render("tasks", {
            tasksArray: tasksArrayDB
        })

    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req,res)=>{
    const body = req.body
    try {
        const taskDB = new Task(body)

        //there must be a way to set isDone to false by default
        //for now I'll set the flag here
        taskDB.isDone = false
        
        await taskDB.save()
        res.redirect('/tasks')

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        const taskDB = await Task.findOne({_id:id})
        res.render('taskDetails',
        {
            task: taskDB,
            error: false,
            message: 'task id found in database'
        })

    } catch (error) {
        res.render('404',
        {
            task: null,
            error: false,
            message: 'task id not found in database'
        })
    }
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const taskDB = await Task.findByIdAndDelete({_id:id})
        
        //check if for some reason we are deleting something that does not exist
        if(!taskDB){
            res.json({
                state: false,
                message: 'Error: Deleting something that is not existing'
            })
        }

        else{
            res.json({
                state: true,
                message: 'Task eliminated successfully'
            })
        }

    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        const taskDB = await Task.findByIdAndUpdate(id, body,{useFindAndModify:false})
        res.json({
            state: true,
            message: 'Edited succesfully'
        })
    } catch (error) {
        console.log(error)
        res.json({
            state: false,
            message: 'Editing of task failed!'
        })
    }
})

module.exports = router