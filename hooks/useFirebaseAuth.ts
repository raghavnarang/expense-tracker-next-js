import { initializeApp } from 'firebase/app';
import { getAuth, EmailAuthProvider, GoogleAuthProvider, GithubAuthProvider, User, Auth } from 'firebase/auth';
import { useEffect, useState, createContext, useContext } from "react";

// Import the css only on the client.
require('firebaseui/dist/firebaseui.css');

const firebaseConfig = {
    apiKey: "AIzaSyBNEWQUe-dYrT2JGuOOJlrZqt26k5dSiwY",
    authDomain: "expense-tracker-16cdf.firebaseapp.com",
    projectId: "expense-tracker-16cdf",
    storageBucket: "expense-tracker-16cdf.appspot.com",
    messagingSenderId: "621402801100",
    appId: "1:621402801100:web:6f2914ece71c930b7e9369"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

type FirebaseAuthObj = {
    user: User | null,
    isLogin: boolean,
    loginId: string,
    isLoading: boolean,
    auth: Auth
}

export const defaultFirebaseAuthVal: FirebaseAuthObj = {
    user: auth.currentUser,
    isLogin: !!auth.currentUser,
    loginId: 'et-login',
    isLoading: true,
    auth
}

let ui: any;

export const useFirebaseAuthSetup = (): FirebaseAuthObj => {
    const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // Init Firebase UI when Auth state is loaded, 
        // and Current User is not logged in
        if (!isLoading && !currentUser) {

            // Firebase UI only works on the Client. So we're loading the package in `componentDidMount`
            // So that this works when doing server-side rendering.
            const firebaseui = require('firebaseui');

            if (!ui) {
                ui = new firebaseui.auth.AuthUI(auth);
            }

            ui.start(`#${defaultFirebaseAuthVal.loginId}`, {
                signInOptions: [
                    EmailAuthProvider.PROVIDER_ID,
                    GoogleAuthProvider.PROVIDER_ID,
                    GithubAuthProvider.PROVIDER_ID
                ]
            });
        }
    }, [isLoading, currentUser]);

    useEffect(() => {
        auth.onAuthStateChanged(() => {
            setCurrentUser(auth.currentUser);
            setLoading(false);
        });
    }, []);

    return {
        ...defaultFirebaseAuthVal,
        user: currentUser,
        isLogin: !!currentUser,
        isLoading
    };
}

export const FirebaseAuthContext = createContext<FirebaseAuthObj>(defaultFirebaseAuthVal);

const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export default useFirebaseAuth;