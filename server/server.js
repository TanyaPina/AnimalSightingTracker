const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();

const PORT = 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from My template ExpressJS' });
});

// create the get request
app.get('/api/students', cors(), async (req, res) => {
  // const STUDENTS = [

  //     { id: 1, firstName: 'Lisa', lastName: 'Lee' },
  //     { id: 2, firstName: 'Eileen', lastName: 'Long' },
  //     { id: 3, firstName: 'Fariba', lastName: 'Dadko' },
  //     { id: 4, firstName: 'Cristina', lastName: 'Rodriguez' },
  //     { id: 5, firstName: 'Andrea', lastName: 'Trejo' },
  // ];
  // res.json(STUDENTS);
  try {
    const { rows: students } = await db.query('SELECT * FROM students');
    res.send(students);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post('/api/students', cors(), async (req, res) => {
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  console.log([newUser.firstname, newUser.lastname]);
  const result = await db.query(
    'INSERT INTO students(firstname, lastname) VALUES($1, $2) RETURNING *',
    [newUser.firstname, newUser.lastname],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

//A put request - Update a student 
app.put('/api/students/:studentId', cors(), async (req, res) =>{
  console.log(req.params);
  //This will be the id that I want to find in the DB - the student to be updated
  const studentId = req.params.studentId
  const updatedStudent = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname}
  console.log("In the server from the url - the student id", studentId);
  console.log("In the server, from the react - the student to be edited", updatedStudent);
  // UPDATE students SET lastname = "something" WHERE id="16";
  const query = `UPDATE students SET lastname=$1, firstname=$2 WHERE id=${studentId} RETURNING *`;
  const values = [updatedStudent.lastname, updatedStudent.firstname];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);

  }catch(e){
    console.log(e);
    return res.status(400).json({e})
  }
})

// create the get request
app.get('/api/sightings', cors(), async (req, res) => {
  try {

    const { rows: sightings } = await db.query('SELECT * FROM sightings');
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post('/api/sightingsposted', cors(), async (req, res) => {
  const newSighting = {
    time_sighted: req.body.time_sighting,
    date_sighted: req.body.date_sighted,
    individual: req.body.individual,
    location: req.body.location,
    healthy: req.body.healthy,
    sighter: req.body.sighter,
  };
  console.log([newSighting.location]);
  const result = await db.query(
    'INSERT INTO sightings(id, time_sighted, date_sighted, individual, location, healthy, sighter) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [newSighting.time_sighted, newSighting.date_sighted, newSighting.individual, newSighting.location, newSighting.healthy, newSighting.sighter],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

//A put request - Update a student 
app.put('/api/sightings/:sightingId', cors(), async (req, res) =>{
  console.log(req.params);
  //This will be the id that I want to find in the DB - the sighting to be updated
  const sightingId = req.params.sightingId
  const updatedSighting = { 
    id: req.body.id, 
    time_sighted: req.body.time_sighting,
    date_sighted: req.body.date_sighted,
    individual: req.body.individual,
    location: req.body.location,
    healthy: req.body.healthy,
    sighter: req.body.sighter}
  console.log("In the server from the url - the sighting id", sightingId);
  console.log("In the server, from the react - the sighting to be edited", updatedSighting);
  // UPDATE sighting SET lastname = "something" WHERE id="16";
  const query = `UPDATE sightings SET time_sighted=$1, date_sighted=$2, individual=$3, location=$4, healthy=$5, sighter=$6 WHERE id=${sightingId} RETURNING *`;
  const values = [updatedSighting.time_sighted, updatedSighting.date_sighted, updatedSighting.individual, updatedSighting.location, updatedSighting.healthy, updatedSighting.sighter];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);

  }catch(e){
    console.log(e);
    return res.status(400).json({e})
  }
})

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
