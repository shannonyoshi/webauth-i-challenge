const express = require("express");
const bcrypt = require("bcryptjs")

const Users = require("./users-model");
//const authenticate = require("../auth/auth-middleware")
const protected = require("../auth/protected-middleware")
const router = express.Router();



router.get("/", protected, (req, res)=> {
    Users.find()
    .then(users=> {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({messahe: "Server Error"})
    })
})



module.exports = router;
