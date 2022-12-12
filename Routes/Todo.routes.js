const express = require("express");

const { todoModel } = require("../Models/todo.model");


const todoRouter = express.Router();

todoRouter.get(`/`, async (req, res) => {
    try {

        const todos = await todoModel.find();
        res.send(todos);


    }
    catch (err) {
        res.status(500).send({ Error: "Something went wrong" })
    }

});

todoRouter.post(`/create`, async (req, res) => {
    try {
        const { title, category, userID } = req.body;
        const todos = new todoModel({ title, category, userID });
        await todos.save();
        res.send("Todos Created Sucessfully");


    }
    catch (err) {
        res.status(500).send({ Error: "Something went wrong" })
    }

});
todoRouter.patch(`/update/:id`, async (req, res) => {
    try {

        const data = req.body;
        const id = req.params.id;
        const todo = await todoModel.findByIdAndUpdate({ _id: id });
        res.send("Updated")
    }



    catch (err) {
        res.send("Update Failed")

    }
});

todoRouter.delete(`/delete`, async (req, res) => {

    try {

    }
    catch (error) {
        res.status(400).send("Login Failed")

    }
});




module.exports = { todoRouter };