const admin = require('firebase-admin');
const moment = require('moment');

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

const adminExportAccounts = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "text/csv");
    const now = moment().format('YYYYMMDD');
    res.header("Content-Disposition", `attachment; filename="revendique-account-${now}.csv"`);

    getTotalUser().then(array => {
        const header = 'EMAIL;DISPLAYNAME';
        const csv = header + "\n" + array.reduce((acc, n) => {
            const line = [n.email, n.displayName ].join(';');
            acc += line + "\n";
            return acc;
        }, '');
        res.send(csv);
    });
};

module.exports = {
    adminExportAccounts
};
