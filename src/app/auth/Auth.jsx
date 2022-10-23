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

const Auth = ({ loginStatusSet, userDataSet }) => {
    return (
        <div className="card">
            <div className="header">To access the Internet<br /> Sign In with</div>
            <div className="social-group">
                <div className="social-icons" onClick={signInWithFacebook}>  <FaFacebookF /></div>
                <div className="social-icons" onClick={() => signInWithGoogle({ loginStatusSet, userDataSet })}>  <FaGoogle /></div>
                <div className="social-icons" onClick={() => loginStatusSet("1")}>  <FaTwitter /></div>
                <div className="social-icons">  <FaApple /></div>
                <div className="social-icons">  <FaPhoneAlt /></div>
            </div>
            <hr />
            <div className="header">or<br />Premium Sign In </div>
            <UserButton onClick={() => alert("Hello")} />
            
        </div>
    )
}

export default Auth;