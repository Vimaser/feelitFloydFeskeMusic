import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { app } from './firebaseConfig';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User signed in:", result.user);
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
};

const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

export { auth, signIn, logOut };
