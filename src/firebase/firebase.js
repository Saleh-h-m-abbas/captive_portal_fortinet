import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp, addDoc, collection } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
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

export const signInWithGoogle = async ({ loginStatusSet, userDataSet, loadingSet }) => {

  loadingSet(true);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    const googleSingIn = await signInWithPopup(auth, provider);
    const token = await googleSingIn.user.getIdTokenResult();
    userDataSet({
      username: googleSingIn.user.displayName, email: googleSingIn.user.email,
      phoneNumber: googleSingIn.user.phoneNumber,
      userPhoto: googleSingIn.user.photoURL,
      uid: googleSingIn.user.uid,
      emailVerified: googleSingIn.user.emailVerified,
      isAnonymous: googleSingIn.user.isAnonymous,
      providerId: googleSingIn.user.providerId,
      creationTime: googleSingIn.user.metadata.creationTime,
      lastSignInTime: googleSingIn.user.metadata.lastSignInTime,
      refreshToken: googleSingIn.user.refreshToken,
      tenantId: googleSingIn.user.tenantId,
      operationType: googleSingIn.operationType,
      authType: googleSingIn.user.providerData[0].providerId,
      token: token.token
    });

    loginStatusSet("1");
    loadingSet(false);
  } catch (error) {
    console.log(error);
    loginStatusSet("0");
    loadingSet(false);

  }
};
export const signInWithFacebook = async ({ loginStatusSet, userDataSet, loadingSet }) => {
  loadingSet(true);
  const provider = new FacebookAuthProvider();
  provider.setCustomParameters({
    display: "popup",
    client_id: "2250daf5fe1776a480b561c90c71cda7",
  });
  provider.addScope("email");
  try {
    const facebookSignIn = await signInWithPopup(auth, provider);
    console.log(facebookSignIn);
    // console.log(facebookSignIn.user.displayName);
    // console.log(facebookSignIn.user.email);
    // console.log(facebookSignIn.user.emailVerified);
    // console.log(facebookSignIn.user.isAnonymous);
    // console.log(facebookSignIn.user.phoneNumber);
    // console.log(facebookSignIn.user.photoURL);

    loginStatusSet(1);
    loadingSet(false);

  } catch (error) {
    console.log(error);
    loginStatusSet(0);
    loadingSet(false);


  }
  loadingSet(false);
};

export const addToFirebase = async (props) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...props.userData,
      loginStatus: props.loginStatus,
      created: serverTimestamp(),
      post: props.postVal,
      user_mac: props.usermacVal,
      ap_mac: props.apmacVal,
      ap_ip: props.apipVal,
      user_ip: props.useripVal,
      ssid: props.ssidVal,
      ap_name: props.apnameVal,
      b_ssid: props.bssidVal,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}