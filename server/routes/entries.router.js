const router = require('express').Router();
const pool = require('../pool');

router.post('/', (req, res) => {
    pool.query(`INSERT INTO "entry" ("entry", "project_id", "entry_date","start_time","end_time")
    VALUES ($1,$2,$3,$4,$5);`,
    [req.body.entry, req.body.project, req.body.date, req.body.startTime, req.body.endTime])
    .then( (results) => {
        res.sendStatus(201);
    })
    .catch( (error) => {
        console.log('Error in entries post: ', error);
        res.sendStatus(500);
    })
})

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "entry";`)
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in entries get: ', error);
        res.sendStatus(500);
    })
})


module.exports = router;