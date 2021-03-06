const router = require('express').Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    pool.query(`INSERT INTO "project" ("name", "person_id")
    VALUES ($1, $2);`, [req.body.projectName, req.user.id]
    ).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in projects post: ', error);
        res.sendStatus(500);
    })
})

router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "project"."name", "project"."id", SUM("entry"."hours") AS "total_hours" FROM "project"
    LEFT OUTER JOIN "entry" ON "entry"."project_id"="project"."id"
    WHERE "project"."person_id"=$1
    GROUP BY "project"."name", "project"."id";`, [req.user.id])
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in projects get: ', error);
        res.sendStatus(500);
    })
})

router.delete('/', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM "project"
    WHERE "id"=$1 AND "person_id"=$2;`, [req.query.id, req.user.id])
    .then( (results) => {
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in projects delete: ', error);
        res.sendStatus(500);
    })
})

router.put('/', rejectUnauthenticated, (req, res) => {
    pool.query('UPDATE"project" SET "name"=$1 WHERE "id"=$2 and "person_id"=$3;',
    [req.body.name, req.query.id, req.user.id])
    .then( (results) => {
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in projects put: ', error);
        res.sendStatus(500);
    })
})

router.get('/filter', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT "project"."name", "project"."id", SUM("entry"."hours") AS "total_hours" FROM "project"
    LEFT OUTER JOIN "entry" ON "entry"."project_id"="project"."id"
    WHERE $1 <= "entry"."entry_date" AND "entry"."entry_date" <= $2 AND "project"."person_id"=$3
    GROUP BY "project"."name", "project"."id";`,
    [req.query.startDate, req.query.endDate, req.user.id])
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in projects/filter get: ', error);
        res.sendStatus(500);
    })
})
module.exports = router;