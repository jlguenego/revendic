interface UserPath {
    login: string;
    createAccount: string;
    passwordForgotten: string;
    accountCreated: string;
    resetMailSent: string;
    manageAccount: string;
    deletedAccount: string;
    verifyAccount: string;
    updatedAccount: string;
    updatePassword: string;
    passwordUpdated: string;
}


const path: UserPath = {
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
const url = Object.keys(path).reduce((acc, prop) => {
    acc[prop] = '/' + path[prop];
    return acc;
}, {}) as UserPath; 

export class UserRoutes {
    static path = path;
    static url = url;
}
