import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "./firebase";

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
};
