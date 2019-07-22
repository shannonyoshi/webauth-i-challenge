const express = require("express");

const UserRouter = require("./users/users-router");

const server = express();

server.use(express.json());

server.use("/users", UserRouter);

server.get("/", (req, res)=> {
    res.send("Server Running")
})

module.exports = server;
