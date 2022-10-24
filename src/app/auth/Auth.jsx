import { signInWithGoogle, signInWithFacebook } from "../../firebase/firebase";
import "./AuthCss.css";
import {
  FaFacebookF,
  FaGoogle,
  FaTwitter,
  FaApple,
  FaPhoneAlt,

} from "react-icons/fa";
import { useState } from "react";
import SignIn from "./SignInWithCredentials/SignIn";

const Auth = ({ loginStatusSet, userDataSet, magicVal, postVal }) => {
  const [flip, setFlip] = useState(false);
  return (
    <>
      <div className={`custom-card ${flip ? "flip" : ""}`}>
        <div className="front">
          <div className="header">
            To access the Internet
            <br /> Sign In with
          </div>
          <div className="social-group">
            <div className="social-icons" onClick={signInWithFacebook}>
              {" "}
              <FaFacebookF />
            </div>
            <div
              className="social-icons"
              onClick={() => signInWithGoogle({ loginStatusSet, userDataSet })}
            >
              {" "}
              <FaGoogle />
            </div>
            <div className="social-icons" onClick={() => loginStatusSet("1")}>
              {" "}
              <FaTwitter />
            </div>
            <div className="social-icons">
              {" "}
              <FaApple />
            </div>
            <div className="social-icons" onClick={() => setFlip(!flip)}>
              {" "}
              <FaPhoneAlt />
            </div>
          </div>
          <hr />
          <div className="header">
            or
            <br />
            Premium Sign In{" "}
          </div>
          <SignIn values={{ postVal, magicVal }} />
          <div style={{ color: "#FFFFFF" }}>@2022 PowerEye</div>
        </div>
        <div className="back">
          <div onClick={() => setFlip(!flip)} className="btn"> &laquo; Back</div>
          <div className="phone-title">Phone Number</div>
          <select name="country" id="country">
            <option value="ps">+970</option>
            <option value="il">+972</option>

          </select>
          <input ></input>
          <button>Send SMS</button>
        </div>
      </div>
    </>
  );
};

export default Auth;
