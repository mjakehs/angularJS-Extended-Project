const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
//add encryption module, set model for salt


//creates an exportabl object with methods to create hash/salt and compare two passwords
const publicAPI = {
    encryptPassword(password) {
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        return bcrypt.hashSync(password, salt);
    },
    comparePassword(candidatePassword, storedPassword) {
        return bcrypt.compareSync(candidatePassword, storedPassword);
    },
};

module.exports = publicAPI;