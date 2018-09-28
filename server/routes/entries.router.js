const router = require('express').Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {
    pool.query(`INSERT INTO "entry" ("entry", "project_id", "person_id", "entry_date","hours")
    VALUES ($1,$2,$3,$4,$5);`,
    [req.body.entry, req.body.project_id, req.user.id, req.body.date, req.body.hours])
    .then( (results) => {
        res.sendStatus(201);
    })
    .catch( (error) => {
        console.log('Error in entries post: ', error);
        res.sendStatus(500);
    })
})

router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "entry".id, "project".name as "name", "entry".project_id, "entry".entry, "entry".entry_date, "entry".hours FROM "entry"
    JOIN "project" on "entry"."project_id"="project"."id"
    WHERE "entry"."person_id"=$1;`, [req.user.id])
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in entries get: ', error);
        res.sendStatus(500);
    })
})

router.delete('/', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM "entry"
    WHERE "id"=$1 AND "person_id"=$2 ;`, [req.query.id, req.user.id])
    .then( (results) => {
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in entries delete: ', error);
        res.sendStatus(500);
    })
})

router.put('/', rejectUnauthenticated, (req, res) => {
    pool.query('UPDATE "entry" SET "entry"=$1, "project_id"=$2, "entry_date"=$3, "hours"=$4 WHERE "id"=$5 AND "person_id"=$6;',
    [req.body.entry, req.body.project_id, req.body.date, req.body.hours, req.query.id, req.user.id])
    .then( (results) => {
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in entries put: ', error);
        res.sendStatus(500);
    })
})

router.get('/duplicate', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "entry" WHERE "project_id"=$1 AND "entry"=$2 AND "person_id"=$3;`,
    [req.query.project_id, req.query.entry, req.user.id])
    .then( (results) => {
        if (results.rowCount = 0){
            res.send({bool: false});
        }
        else {
            res.send({bool: true});
        }
    })
    .catch( (error) => {
        console.log('Error in entries duplicate checker: ', error);
        res.sendStatus(500);
    })
})


module.exports = router;