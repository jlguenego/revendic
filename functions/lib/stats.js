var admin = require("firebase-admin");

var serviceAccount = require("../secret.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://revendic-prod.firebaseio.com"
});

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


module.exports = (request, response) => {
    getTotalUser().then(array => {
        response.json({
            count: array.length
        });
    });
};
