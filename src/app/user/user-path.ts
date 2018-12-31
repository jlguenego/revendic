const path = {
    login: 'connexion',
    createAccount: 'nouveau-compte',
    passwordForgotten: 'oubli-mot-de-passe',
    accountCreated: 'compte-cree',
    resetMailSent: 'email-mot-de-passe-envoye',
    manageAccount: 'mon-compte',
    deletedAccount: 'compte-efface',
    verifyAccount: 'verifie-compte',
    updatedAccount: 'compte-mis-a-jour',
    updatePassword: 'modification-mot-de-passe',
    passwordUpdated: 'mot-de-passe-change-avec-succes',
};

// generate the same objet with prefix '/'
const url: { [key: string]: string } = Object.keys(path).reduce((acc, prop) => {
    acc[prop] = '/' + path[prop];
    return acc;
}, {}); 

export class UserPath {
    static path = path;
    static url = url;
}
