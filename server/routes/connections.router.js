const router = require('express').Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//add new connection, delete a connection, get all connections

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    pool.query(`INSERT INTO "connections" ("person_one_id", "person_two_id")
                VALUES ($1, $2), ($2, $1);`, [req.user.id, req.body.id])
    .then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in connections post: ', error);
        res.sendStatus(500);
    })
})

router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "connections"
    JOIN "person" ON "person"."id"="connections".person_two_id
    WHERE "connections".person_one_id=$1;`, [req.user.id])
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in connections get: ', error);
        res.sendStatus(500);
    })
})

router.delete('/', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM "connections" WHERE ("person_one_id"=$1 AND "person_two_id"=$2)
    OR ("person_one_id"=$2 AND "person_two_id"=$1);`, [req.user.id, req.query.id])
    .then( (results) => {
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in connections delete: ', error);
        res.sendStatus(500);
    })
})

router.post('/request', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    pool.query(`INSERT INTO "connection_request" ("from_person_id", "to_person_id")
                VALUES ($1, $2);`, [req.user.id, req.body.id])
    .then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in connections post: ', error);
        res.sendStatus(500);
    })
})

router.get('/request/received', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "connection_request"
    JOIN "person" ON "person"."id"="connection_request"."from_person_id"
    WHERE "connection_request"."to_person_id"=$1;`, [req.user.id])
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in connection_request get: ', error);
        res.sendStatus(500);
    })
})

router.get('/request/sent', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "connection_request"
    JOIN "person" ON "person"."id"="connection_request"."to_person_id"
    WHERE "connection_request"."from_person_id"=$1;`, [req.user.id])
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in connection_request get: ', error);
        res.sendStatus(500);
    })
})

router.delete('/request/sent', rejectUnauthenticated, (req, res) => {
    pool.query()
    .then( (results) => {
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in connections delete: ', error);
        res.sendStatus(500);
    })
})

router.delete('/request/received', rejectUnauthenticated, (req, res) => {
    pool.query()
    .then( (results) => {
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in connections delete: ', error);
        res.sendStatus(500);
    })
})

module.exports = router;