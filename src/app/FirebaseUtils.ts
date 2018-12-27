
const config = {
    "auth/requires-recent-login": "Pour faire cette opération. Vous avez besoin d'être recemment loggué."
}

export class FirebaseUtils {
    static getLocaleMessage(error) {
        return config[error.code];
    }
}