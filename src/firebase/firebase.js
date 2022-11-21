import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp, addDoc, collection } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider
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
    await signInWithPopup(auth, provider).then((result) => {
      // You can use these server side with your app's credentials to access the Twitter API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;


      userDataSet({
        username: result.user.displayName, email: result.user.email,
        phoneNumber: result.user.phoneNumber,
        userPhoto: result.user.photoURL,
        uid: result.user.uid,
        emailVerified: result.user.emailVerified,
        isAnonymous: result.user.isAnonymous,
        providerId: result.user.providerId,
        creationTime: result.user.metadata.creationTime,
        lastSignInTime: result.user.metadata.lastSignInTime,
        refreshToken: result.user.refreshToken,
        tenantId: result.user.tenantId,
        operationType: result.operationType,
        authType: result.user.providerData[0].providerId,
        token: token
      });

      loginStatusSet("1");
      loadingSet(false);
    }).catch((error) => {
      loginStatusSet("0");
      loadingSet(false);
    });


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
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        userDataSet({
          username: result.user.displayName,
          email: result.user.email,
          phoneNumber: result.user.phoneNumber,
          userPhoto: result.user.photoURL,
          uid: result.user.uid,
          emailVerified: result.user.emailVerified,
          isAnonymous: result.user.isAnonymous,
          providerId: result.user.providerId,
          creationTime: result.user.metadata.creationTime,
          lastSignInTime: result.user.metadata.lastSignInTime,
          refreshToken: result.user.refreshToken,
          tenantId: result.user.tenantId,
          operationType: result.operationType,
          authType: result.user.providerData[0].providerId,
          token: accessToken
        });
        loginStatusSet("1");
        loadingSet(false);
      })
      .catch((error) => {
        loginStatusSet("0");
        loadingSet(false);
      });



  } catch (error) {
    console.log(error);
    loginStatusSet("0");
    loadingSet(false);


  }
  loadingSet(false);
};

export const signInWithTwitter = async ({ loginStatusSet, userDataSet, loadingSet }) => {
  loadingSet(true);
  const auth = getAuth();
  const provider = new TwitterAuthProvider();
  provider.setCustomParameters({
    display: "popup",
  });
  provider.addScope("email");
  try {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        userDataSet({
          username: result.user.displayName,
          email: result.user.email,
          phoneNumber: result.user.phoneNumber,
          userPhoto: result.user.photoURL,
          uid: result.user.uid,
          emailVerified: result.user.emailVerified,
          isAnonymous: result.user.isAnonymous,
          providerId: result.user.providerId,
          creationTime: result.user.metadata.creationTime,
          lastSignInTime: result.user.metadata.lastSignInTime,
          refreshToken: result.user.refreshToken,
          tenantId: result.user.tenantId,
          operationType: result.operationType,
          authType: result.user.providerData[0].providerId,
          token: token
        });
        loginStatusSet("1");
        loadingSet(false);

      }).catch((error) => {
        loginStatusSet("0");
        loadingSet(false);

      });


  } catch (error) {
    console.log(error);
    loginStatusSet("0");
    loadingSet(false);
  }
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

    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}