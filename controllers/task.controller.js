const tasks = require("../task.json");

exports.createTask = (req, res) => {
   const  {title , description, completed} = req.body
   if (!title || !description || completed === undefined){
    return res.status(400).send()
   }

   const newTask = {
    id : parseInt(tasks.tasks.lenghth + 1),
    title,
    description,
    completed
   }

    tasks.tasks.push(newTask)

    return res.status(201).send()
}

exports.getAllTask = (req,res) =>{
    return res.status(200).send(
        [...tasks.tasks]
    )
}

exports.getTaskById = (req,res) =>{
    const id = parseInt(req.params.id)
    const task = tasks.tasks?.find((t) => t.id === id)
    if (!task){
        return res.status(404).send()
    }
    return res.status(200).send({
        ...task
    })
}

exports.updateTask = (req,res) =>{
    const id = parseInt(req.params.id)
    const taskIndex = tasks.tasks?.findIndex((t) => t.id === id)
    if (taskIndex === -1){
        return res.status(404).send()
    }

    const {title, description, completed} = req.body
    if ((!title || typeof title !== "string") || (!description || typeof description !== "string") || (typeof completed !== "boolean")){
        return res.status(400).send()
    }

    tasks.tasks[taskIndex] = {
        id,
        title,
        description,
        completed
    }

    return res.status(200).send()
}

exports.deleteTask = (req,res) =>{
    const id = parseInt(req.params.id)
    const taskIndex = tasks.tasks.findIndex((t) => t.id === id)
    if (taskIndex === -1){
        return res.status(404).send({
            message : "task not found"
        })
    }

    tasks.tasks.splice(taskIndex, 1)

    return res.status(200).send({
        message : "task deleted successfully"
    })
}
