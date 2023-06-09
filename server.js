const express = require("express");
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const app = express();
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    connectionString: 'postgres://face_detective_user:KK35drypRRQglkXV4S17SJ7pJvXfgK5Z@dpg-cgd69te4dad6omiam9hg-a/face_detective',
    ssl: {rejectUnauthorized: false},
    host: 'dpg-cgd69te4dad6omiam9hg-a',
    port: 5432,
    user: 'face_detective_user',
    password: 'KK35drypRRQglkXV4S17SJ7pJvXfgK5Z',
    database: 'face_detective',
  },
});

const port = process.env.PORT;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => { res.send('success'); });
app.post("/signin", (signin.handleSignin(db, bcrypt)))
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) });
app.put("/image", (req, res) => { image.handleImage(req, res, db) });
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) })

app.listen(port || 3001, () => {
  console.log(`app running on port ${port} or 3001`);
});

// Plan your api i.e what your api design wll look

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
