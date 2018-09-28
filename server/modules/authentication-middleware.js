//Middleware function that runs on auth protected routes to make sure user
//is logged in.
const rejectUnauthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = { rejectUnauthenticated };