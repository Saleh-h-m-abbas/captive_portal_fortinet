import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp,addDoc, collection } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);

export const signInWithGoogle = async (loginStatusSet,loginValue,errorValue) => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try{
    const googleSingIn = await signInWithPopup(auth, provider);
    console.log(googleSingIn);
    console.log( JSON.stringify(googleSingIn.user));
    console.log(googleSingIn.user.email);
    console.log(googleSingIn.user.displayName);
    console.log(googleSingIn.user.getIdToken);
    console.log(googleSingIn.user.phoneNumber);
    console.log(googleSingIn.user.photoURL);
    console.log(googleSingIn.user.providerId);
    console.log(googleSingIn.user.providerData);
    console.log(googleSingIn.user.uid);
    loginStatusSet(loginValue);
  }catch(error){
    console.log(error);
    loginStatusSet(errorValue);
  }
};
export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  provider.setCustomParameters({
    display: "popup",
  });
  provider.addScope("user_birthday");
  try {
    const facebookSignIn = await signInWithRedirect(auth, provider);
    console.log(facebookSignIn);
  } catch (error) {
    console.log(error);
  }
};

export const addToFirebase = async (props) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      loginStatus: props.loginStatus,
      magic: props.magic,
      redirectIp: props.redirectIp,
      userIp: props.userIp,
      userMac: props.userMac,
      created: serverTimestamp()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}