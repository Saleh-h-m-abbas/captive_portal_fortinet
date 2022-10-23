import {
    FacebookLoginButton,
    GoogleLoginButton,
    TwitterLoginButton,
    AppleLoginButton,
} from "react-social-login-buttons";
import PhoneButton from "../button/PhoneButton";
import UserButton from "../button/UserLogin";
import { signInWithGoogle, signInWithFacebook } from "../../firebase/firebase";
import './AuthCss.css'
import { FaFacebookF, FaGoogle, FaTwitter, FaApple, FaPhoneAlt } from 'react-icons/fa';
import { useState } from "react";

const Auth = ({ loginStatusSet, userDataSet }) => {
    const [flip, setFlip] = useState(false)
    return (
        <>
            <div className={`card ${flip ? 'flip' : ''}`}>
                <div className="custom-card front">
                    <div className="header">To access the Internet<br /> Sign In with</div>
                    <div className="social-group">
                        <div className="social-icons" onClick={signInWithFacebook}>  <FaFacebookF /></div>
                        <div className="social-icons" onClick={() => signInWithGoogle({ loginStatusSet, userDataSet })}>  <FaGoogle /></div>
                        <div className="social-icons" onClick={() => loginStatusSet("1")}>  <FaTwitter /></div>
                        <div className="social-icons">  <FaApple /></div>
                        <div className="social-icons" onClick={() => setFlip(!flip)}>  <FaPhoneAlt /></div>
                    </div>
                    <hr />
                    <div className="header">or<br />Premium Sign In </div>
                    <UserButton onClick={() => alert("Hello")} />

                </div>
                {/* <div className="back">
                    <div className="header">PhoneNumber</div>

                </div> */}
            </div>
        </>
    )
}

export default Auth;