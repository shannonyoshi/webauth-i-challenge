const express = require("express");

const UserRouter = require("../users/users-router");
const AuthRouter = require("../auth/auth-router")
const setupMiddleware = require("./setup-middleware")

const server = express();
setupMiddleware(server)

server.use("/api/users", UserRouter);
server.use("/api/auth", AuthRouter)

server.get("/", (req, res) => {
  res.send("Server Running");
});

module.exports = server;
