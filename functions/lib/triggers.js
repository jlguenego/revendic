const functions = require('firebase-functions');
const admin = require('firebase-admin');

function aggregateLike(revid) {
    // setup 3 fields in the revendication
    // like, dislike, voters
    const rev = admin.firestore().doc(`/revendications/${revid}`);
    const votersRef = admin.firestore().collection(`/likes-revendications/${revid}/users`);
    return votersRef.get().then(querySnapshot => {
        const docs = querySnapshot.docs.map(doc => {
            const id = doc.id;
            const data = doc.data();
            return { id, like: data.like };
        });
        const likers = docs.filter(doc => +doc.like === 1).map(doc => doc.id);
        const like = likers.length;
        const dislikers = docs.filter(doc => +doc.like === -1).map(doc => doc.id);
        const dislike = dislikers.length;
        return rev.update({ like, dislike, likers, dislikers });
    });
}

const likeTrigger = functions.firestore.document('likes-revendications/{revid}/users/{userid}')
    .onWrite((change, context) => {
        return aggregateLike(context.params.revid);
    });

const likeMigration = functions.https.onRequest((req, res) => {
    admin.firestore().collection(`/revendications`).get().then(querySnapshot => {
        querySnapshot.forEach(async doc => {
            console.log('revid', doc.id);
            await aggregateLike(doc.id);
            console.log('ok');
        });
    });
});

module.exports = {
    likeTrigger, likeMigration
};