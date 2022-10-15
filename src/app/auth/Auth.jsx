import {
    FacebookLoginButton,
    GoogleLoginButton,
    TwitterLoginButton,
    AppleLoginButton,
} from "react-social-login-buttons";
import PhoneButton from "../phone_button/PhoneButton";
import { signInWithGoogle, signInWithFacebook } from "../../firebase/firebase";

const Auth = ({loginStatusSet},props) => {

    return (
        <div>
            <FacebookLoginButton onClick={signInWithFacebook}>
                <span>Sign in with Facebook</span>
            </FacebookLoginButton>
            <GoogleLoginButton onClick={() => signInWithGoogle(loginStatusSet,props.agreeVal,props.declineVal)}>
                <span>Sign in with Google</span>
            </GoogleLoginButton>
            <TwitterLoginButton onClick={() => loginStatusSet(1)}>
                <span>Sign in with Twitter</span>
            </TwitterLoginButton>
            <AppleLoginButton
                onClick={() => alert("Hello")}
                activeStyle={{ background: "#EFF0EE" }}
            >
                <span>Sign in with Apple</span>
            </AppleLoginButton>
            <PhoneButton onClick={() => alert("Hello")} />
        </div>
    )
}

export default Auth;