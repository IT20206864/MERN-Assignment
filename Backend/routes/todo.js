const router = require("express").Router();
let Todo = require("../models/todo");


// Routes

// Post API

router.route("/add").post(async(req,res) =>{
    const { title } = req.body;

    const newTodo = new Todo({
        title,
        status : "Pending"
    });

    await newTodo.save().then(() =>{
        res.json("Todo Added");
    }).catch((err) =>{
        console.log(err);
        res.status(400).json({msg : "Error in Adding"})
    })
})

// Fetch API 

router.route("/").get((async(req,res) =>{
    await Todo.find().then((data) =>{
        res.status(200).json(data);
    }).catch((err) =>{
        res.status(400).json({msg : "Error in Fetching"})
    })
}))


// Edit API 

router.route("/edit/:id").put((async(req,res)=>{
    const id = req.params.id;
    const { title , status  } = req.body;
    const newTodo = {
        title,
        status 
    }
    await Todo.findByIdAndUpdate( id, newTodo ).then((data)=>{
        res.status(200).json({msg:"Update Succesful"});
    }).catch((err) =>{
        console.log(err);
        res.status(400).json({msg:"Edit Failed"});
    })
}))

// Delete API 

router.route("/delete/:id").delete((async(req,res)=>{
    const id = req.params.id;
    await Todo.findByIdAndDelete(id).then((data) =>{
        res.status(200).json({msg : "Deletion Succesfull"});
    }).catch((err) =>{
        console.log(err);
        res.status(400).json({msg:"Deletion Failed"});
    })
}))

module.exports = router;