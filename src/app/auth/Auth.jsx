import { signInWithGoogle, signInWithFacebook, signInWithTwitter } from "../../firebase/firebase";
import "./AuthCss.css";
import {
  FaFacebookF,
  FaGoogle,
  FaTwitter,
  FaPhoneAlt,
} from "react-icons/fa";
import { useState } from "react";
import SignIn from "./SignInWithCredentials/SignIn";
import SignInPhoneNumber from "./SignInWithPhoneNumber/SignInWithPhoneNumber";

const Auth = ({ loginStatusSet, userDataSet, loadingSet, magicVal, postVal }) => {

  const [flip, setFlip] = useState(false);
  const [codeSend, codeSendSet] = useState(false);
  return (
    <>
      <div className={`custom-card ${flip ? "flip" : ""}`}>
        <div className="front">
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
            {/* <div className="social-icons">
              <FaApple />
            </div> */}
            <div className="social-icons" onClick={() => setFlip(!flip)}>
              <FaPhoneAlt />
            </div>
          </div>
          <hr />
          <div className="header">
            or
            <br />
            Premium Sign In
          </div>
          <SignIn magicVal={magicVal} postVal={postVal} loadingSet={loadingSet} />
          <div style={{ color: "#FFFFFF" }}>@2022 PowerEye</div>
        </div>
        <div id="back" className="back">
          <SignInPhoneNumber loginStatusSet={loginStatusSet} userDataSet={userDataSet} loadingSet={loadingSet} codeSendSet={codeSendSet} flip={flip} setFlip={setFlip} codeSend={codeSend} />
        </div>
      </div>
    </>
  );
};

export default Auth;
