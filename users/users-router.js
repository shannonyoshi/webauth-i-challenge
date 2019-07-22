const express = require("express");
const bcrypt = require("bcryptjs")

const Users = require("./users-model");
const authenticate = require("../auth/auth-middleware")

const router = express.Router();

router.post("/register", (req, res)=> {
    let user = req.body
    const hash = bcrypt.hashSync(user.password,12)
    user.password = hash
    console.log(hash)
    Users.add(user)
    .then(saved => {
        res.status(201).json(saved)
    })
    .catch(error=> {
        res.status(500).json(error)
    })
})

router.post("/login", (req, res)=> {
    let {username, password} = req.body
    Users.findBy({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({message: `Welcome ${user.username}`})
        } else {
            res.status(401).json({message: "Invalid Credentials"})
        }
    })
    .catch(error=> {
        res.status(500).json(error)
        console.log(error)
    })
})

router.get("/", authenticate, (req, res)=> {
    Users.find()
    .then(users=> {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({messahe: "Server Error"})
    })
})

module.exports = router;
