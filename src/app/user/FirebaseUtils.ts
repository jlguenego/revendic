
const config = {
    "auth/requires-recent-login": "Pour faire cette opération. Vous avez besoin d'être récemment connecté.",
    "auth/user-token-expired": "Votre session a expiré.",
    "auth/too-many-requests": "Erreur technique. Site trop surchargé. Réessayer ultérieurement.",
    "auth/wrong-password": "Mot de passe invalide.",
    "auth/weak-password": "Mot de passe trop faible. Il doit contenir plus de 6 caractères.",
}

export class FirebaseUtils {
    static getLocaleMessage(error) {
        return config[error.code] || 'Erreur non traduite: ' + error;
    }
}