import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp, addDoc, collection } from "firebase/firestore";
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

export const signInWithGoogle = async ({ loginStatusSet, agreeVal, declineVal, userDataSet }) => {


  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    const googleSingIn = await signInWithPopup(auth, provider);
    const token = await googleSingIn.user.getIdTokenResult();
    userDataSet({ username: googleSingIn.user.displayName, email: googleSingIn.user.email,
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
    loginStatusSet(agreeVal.agreeVal);
  } catch (error) {
    console.log(error);
    loginStatusSet(declineVal.declineVal);
  }
};
export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  provider.setCustomParameters({
    display: "popup",
    client_id:"2250daf5fe1776a480b561c90c71cda7",
  });
  provider.addScope("email");
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
      ...props.userData,
      loginStatus: props.loginStatus,
      created: serverTimestamp(),
      magicVal: props.magicVal,
      userIp: props.userIp,
      userMac: props.userMac,
      apMac: props.apMac,
      apIp: props.apIp,
      apSsid: props.apSsid,
      protUri: props.protUri,
      disclaimerAct: props.disclaimerAct,
      disclaimerMethod: props.disclaimerMethod,
      cpAuthSsid: props.cpAuthSsid,
      cpAuthIntf: props.cpAuthIntf,
      deviceType: props.deviceType,
      portalAddr: props.portalAddr,
      policyId: props.policyId,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}