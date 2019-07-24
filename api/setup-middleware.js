const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const cors = require("cors");
const KnexSessionStore = require("connect-session-knex")(session);

module.exports = server => {
  const sessionConfig = {
    name: "webauthsesh",
    secret: process.env.SESSION_SECRET || "Keep it quiet",
    duration: 24 * 60 * 60 * 1000,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false //only false for development, then must be true to ensure cookies are only sent over https
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
      knex: require("../data/dbConfig"),
      tablename: "sessions",
      createTable: true,
      sidfieldname: "sID",
      clearInterval: 1000 * 60 * 24 * 24
    })
  };
  server.use(express.json());
  server.use(session(sessionConfig));
  server.use(helmet());
  server.use(cors());
};
