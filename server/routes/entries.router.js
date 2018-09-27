const router = require('express').Router();
const pool = require('../pool');

router.post('/', (req, res) => {
    pool.query(`INSERT INTO "entry" ("entry", "project_id", "entry_date","hours")
    VALUES ($1,$2,$3,$4);`,
    [req.body.entry, req.body.project_id, req.body.date, req.body.hours])
    .then( (results) => {
        res.sendStatus(201);
    })
    .catch( (error) => {
        console.log('Error in entries post: ', error);
        res.sendStatus(500);
    })
})

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "entry"
    JOIN "project" on "entry"."project_id"="project"."id";`)
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in entries get: ', error);
        res.sendStatus(500);
    })
})

router.delete('/', (req, res) => {
    console.log(req.query);
    pool.query(`DELETE FROM "entry"
    WHERE "id"=$1;`, [req.query.id])
    .then( (results) => {
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in entries delete: ', error);
        res.sendStatus(500);
    })
})


module.exports = router;