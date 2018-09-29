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

router.get('/sent', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "messages".message_body AS "message", "person".username AS "to" FROM "messages"
    JOIN "person" ON "messages"."to_person_id"="person".id
    WHERE "from_person_id"=$1;`, [req.user.id])
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in messages/sent get: ', error);
        res.sendStatus(500);
    })
})

router.get('/received', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "messages".message_body AS "message", "person".username AS "from" FROM "messages"
    JOIN "person" ON "messages"."from_person_id"="person".id
    WHERE "to_person_id"=$1;`, [req.user.id])
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in messages/received get: ', error);
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