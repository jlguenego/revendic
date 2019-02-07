const functions = require('firebase-functions');

const likeTrigger = functions.firestore.document('likes-revendications/{revid}/users/{userid}')
    .onWrite((change, context) => {
        console.log('change', change);
        console.log('context', context);

        // setup 3 fields in the revendication
        // like, dislike, voters
        

        return 0;
    });

module.exports = {
    likeTrigger
};