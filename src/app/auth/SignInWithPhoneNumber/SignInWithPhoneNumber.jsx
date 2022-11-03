import { useState } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from '../../../firebase/firebase';
import "./SignInWithPhoneNumber.css";

const SignInPhoneNumber = ({ loadingSet, loginStatusSet, userDataSet, codeSendSet, codeSend, flip, setFlip }) => {
    const [countryCode, countryCodeSet] = useState('+970');
    const [phoneNumber, phoneNumberSet] = useState('');
    const [veririficationCode, veririficationCodeSet] = useState(false);

    const handleChange = (event) => {
        countryCodeSet(event.target.value);
    };
    const phoneSend = async (e) => {
        loadingSet(true);
        const fullNumber = countryCode + phoneNumber;

        window.recaptchaVerifier = new RecaptchaVerifier('reCAPTCHA', {
            'size': 'invisible',
            'callback': (response) => {
            }
        }, auth);

        let appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, fullNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                codeSendSet(true);
                loadingSet(false);
            }).catch((error) => {
                console.log(error);
                codeSendSet(false);
                loadingSet(false);
            });
    }
    const verifiy = () => {
        loadingSet(true);
        let confirmationResult = window.confirmationResult;

        confirmationResult.confirm(veririficationCode).then((result) => {
            const user = result.user;
            console.log(user);
            console.log("Login Succssfuly ");
            loadingSet(false);
            loginStatusSet("1");
        }).catch((error) => {
            loadingSet(false);
            loginStatusSet("0");
            console.log(error);

        });
    }
    return (
        <>
            <div>
                {!codeSend && <div>
                    <label id="country_code-label">Country Code</label>
                    <select
                        labelId="country_code-label"
                        className={"field"}
                        id="country_code"
                        value={countryCode}
                        label="Country Code"
                        defaultValue="+970"
                        onChange={handleChange}
                    >
                        <option value={"+970"}>+970</option>
                        <option value={"+972"}>+972</option>
                    </select>

                    <div   className="field">

                        <input
                            variant="standard"
                            required
                      

                            id="outlined-required"
                            label="Phone Number"
                            type="number"
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9)
                                phoneNumberSet(e.target.value);
                            }}
                        />


                    </div>

                    <button id='sign-in-button' variant="contained" color="success" onClick={() => phoneSend()}>
                        Send
                    </button>

                </div>}



                {codeSend &&
                    <div>
                        <input
                            required
                            id="outlined-required"
                            label="Code Verirification"
                            type="number"
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                                veririficationCodeSet(e.target.value);
                            }} />

                        <button id='sign-in-button' variant="contained" color="success" onClick={() => verifiy()}>
                            verifiy
                        </button>


                    </div>

                }
            </div>


            <div hidden={true} id="reCAPTCHA"></div>
        </>

    );
}

export default SignInPhoneNumber;