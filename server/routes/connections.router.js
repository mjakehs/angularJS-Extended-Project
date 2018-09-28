const router = require('express').Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//add new connection, delete a connection, get all connections

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    pool.query()
    .then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in connections post: ', error);
        res.sendStatus(500);
    })
})

router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query()
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in connections get: ', error);
        res.sendStatus(500);
    })
})

router.delete('/', rejectUnauthenticated, (req, res) => {
    pool.query()
    .then( (results) => {
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in connections delete: ', error);
        res.sendStatus(500);
    })
})
