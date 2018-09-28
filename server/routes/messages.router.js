const router = require('express').Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    pool.query()
    .then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in messages post: ', error);
        res.sendStatus(500);
    })
})

router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query()
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in messages get: ', error);
        res.sendStatus(500);
    })
})

router.delete('/', rejectUnauthenticated, (req, res) => {
    pool.query()
    .then( (results) => {
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in messages delete: ', error);
        res.sendStatus(500);
    })
})

module.exports = router;