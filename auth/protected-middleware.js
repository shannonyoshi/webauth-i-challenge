const express = require("express")

module.exports = protected

function protected(req, res, next) {
    if (req.session && req.session.username) {
        next()
    } else {
        res.status(401).json({message: "Log in to see content"})
    }
}

module.exports = protected