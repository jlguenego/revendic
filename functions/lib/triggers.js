const functions = require('firebase-functions');
const admin = require('firebase-admin');

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

function aggregateLike(revid) {
    // setup 3 fields in the revendication
    // like, dislike, voters
    const rev = firestore.doc(`/revendications/${revid}`);
    const votersRef = firestore.collection(`/likes-revendications/${revid}/users`);
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
    return firestore.collection(`/revendications`).get().then(querySnapshot => {
        const docs = querySnapshot.docs.map(n => n);
        function f() {
            if (docs.length === 0) {
                console.log('finished.');
                return;
            }
            return Promise.resolve().then(() => {
                const doc = docs.pop();
                console.log('about to handle', doc.id);
                return aggregateLike(doc.id);
            }).then(() => {
                console.log('done');
                f();
            });
        }
        f();
    });
});

module.exports = {
    likeTrigger, likeMigration
};