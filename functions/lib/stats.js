const admin = require('firebase-admin');

function getTotalUser() {
    const array = [];

    function listAllUsers(nextPageToken) {
        // List batch of users, 1000 at a time.
        return admin.auth().listUsers(1000, nextPageToken)
            .then(res => {
                res.users.forEach(userRecord => array.push(userRecord));
                if (res.pageToken) {
                    return listAllUsers(res.pageToken)
                } else {
                    return array;
                }
            });
    }
    // Start listing users from the beginning, 1000 at a time.
    return listAllUsers();
}


module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    getTotalUser().then(array => {
        res.json({
            count: array.length
        });
    });
};
