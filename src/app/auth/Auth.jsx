import { signInWithGoogle, signInWithFacebook, signInWithTwitter } from "../../firebase/firebase";
import "./AuthCss.css";
import {
  FaFacebookF,
  FaGoogle,
  FaTwitter,
  FaPhoneAlt,
  FaUserAlt
} from "react-icons/fa";
import { useState } from "react";
import SignIn from "./SignInWithCredentials/SignIn";
import SignInPhoneNumber from "./SignInWithPhoneNumber/SignInWithPhoneNumber";

const Auth = ({ loginStatusSet, userDataSet, loadingSet, magicVal, postVal }) => {

  const [flip, setFlip] = useState(true);
  const [codeSend, codeSendSet] = useState(false);
  return (
    <>
      <div className={"custom-card"}>
        <div className="header">
          To access the Internet
          <br /> Sign In with
        </div>
        <div className="social-group">
          <div className="social-icons" onClick={() => signInWithFacebook({ loginStatusSet, userDataSet, loadingSet })}>
            <FaFacebookF />
          </div>
          <div
            className="social-icons"
            onClick={() => signInWithGoogle({ loginStatusSet, userDataSet, loadingSet })}
          >
            <FaGoogle />
          </div>
          <div className="social-icons" onClick={() => signInWithTwitter({ loginStatusSet, userDataSet, loadingSet })}>
            <FaTwitter />
          </div>
          <div className="social-icons" onClick={() => setFlip(!flip)}>
            {flip ? <FaPhoneAlt /> : <FaUserAlt />}
          </div>
        </div>
        <hr />
        <div className="none-soical-media">
        <div className="header">
          or
          <br />
          {flip ? "Premium Sign In" : "Sign In with Phone Number"}
        </div>
     
          <div style={{ display: !flip ? "none" : "block" }}>
            <SignIn magicVal={magicVal} postVal={postVal} loadingSet={loadingSet} />
          </div>

          <div style={{ display: flip ? "none" : "block" }}>
            <SignInPhoneNumber loginStatusSet={loginStatusSet} userDataSet={userDataSet} loadingSet={loadingSet} codeSendSet={codeSendSet} flip={flip} setFlip={setFlip} codeSend={codeSend} />
          </div>
          <div style={{ color: "#FFFFFF" }}>@2022 PowerEye</div>

        </div>
      </div>

    </>
  );
};

export default Auth;
