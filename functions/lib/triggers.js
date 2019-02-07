const functions = require('firebase-functions');
const admin = require('firebase-admin');

const likeTrigger = functions.firestore.document('likes-revendications/{revid}/users/{userid}')
    .onWrite((change, context) => {
        // console.log('change', change);
        console.log('context', context);

        // setup 3 fields in the revendication
        // like, dislike, voters
        const rev = admin.firestore().doc(`/revendications/${context.params.revid}`);
        const votersRef = admin.firestore().collection(`/likes-revendications/${context.params.revid}/users`);
        return votersRef.get().then(querySnapshot => {
            console.log('querySnapshot', querySnapshot.size);
            const docs = querySnapshot.docs.map(doc => {
                const id = doc.id;
                const data = doc.data();
                return {id, like: data.like};
            });
            console.log('docs', docs.length);
            const likers = docs.filter(doc => +doc.like === 1).map(doc => doc.id);
            const like = likers.length;
            console.log('like', like);
            const dislikers = docs.filter(doc => +doc.like === -1).map(doc => doc.id);
            const dislike = dislikers.length;
            console.log('dislike', dislike);
            return rev.update({ like, dislike, likers, dislikers });
        });

    });

module.exports = {
    likeTrigger
};