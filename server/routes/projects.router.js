const router = require('express').Router();
const pool = require('../pool');

router.post('/', (req, res) => {
    console.log(req.body);
    pool.query(`INSERT INTO "project" ("name")
    VALUES ($1);`, [req.body.project_name]
    ).then((results) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error in projects post: ', error);
        res.sendStatus(500);
    })
})

router.get('/', (req, res) => {
    pool.query(`SELECT "project"."name", "project"."id", SUM("entry"."hours") AS "total_hours" FROM "project"
    LEFT OUTER JOIN "entry" ON "entry"."project_id"="project"."id"
    GROUP BY "project"."name", "project"."id";`)
    .then( (results) => {
        res.send(results.rows);
    })
    .catch( (error) => {
        console.log('Error in entries get: ', error);
        res.sendStatus(500);
    })
})

router.delete('/', (req, res) => {
    pool.query(`DELETE FROM "project"
    WHERE "id"=$1;`, [req.query.id])
    .then( (results) => {
        res.sendStatus(200);
    })
    .catch( (error) => {
        console.log('Error in projects delete: ', error);
        res.sendStatus(500);
    })
})


module.exports = router;