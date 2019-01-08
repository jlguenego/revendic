import * as functions from 'firebase-functions';

// Help for SSR : https://hackernoon.com/deploying-angular-universal-v6-with-firebase-c86381ddd445

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase JLG!");
});
