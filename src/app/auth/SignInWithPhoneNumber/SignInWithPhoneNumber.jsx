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
            <div className="phone-title">Phone Number</div>
            <div>
                {!codeSend && <div>
                    <label id="country_code-label">Country Code</label>
                                    <select
                                        labelId="country_code-label"
                                        // className={useStyles.root}
                                        id="country_code"
                                        value={countryCode}
                                        label="Country Code"
                                        defaultValue="+970"
                                        onChange={handleChange}
                                    >
                                        <option value={"+970"}>+970</option>
                                        <option value={"+972"}>+972</option>
                                    </select>

                                    <div>

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
                    {/* <Grid container spacing={1}>
                        <Grid item xs={4}>
                            <Box sx={{ minWidth: 20 }}>
                                <FormControl fullWidth >
                                    <InputLabel id="country_code-label">Country Code</InputLabel>
                                    <Select
                                        labelId="country_code-label"
                                        // className={useStyles.root}
                                        id="country_code"
                                        value={countryCode}
                                        label="Country Code"
                                        defaultValue="+970"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"+970"}>+970</MenuItem>
                                        <MenuItem value={"+972"}>+972</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
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
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} padding={2}>
                        <Grid item xs={12}>
                            <Button id='sign-in-button' variant="contained" endIcon={<SendIcon />} color="success" onClick={() => phoneSend()}>
                                Send
                            </Button>
                        </Grid>
                    </Grid> */}
                </div>}



                {codeSend &&
                    <div>
                        {/* <Grid>
                            <TextField
                                required
                                id="outlined-required"
                                label="Code Verirification"
                                type="number"
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                                    veririficationCodeSet(e.target.value);
                                }}
                            /></Grid>
                        <br />
                        <Grid container spacing={3}>

                            <Grid item xs={12}>
                                <Button id='sign-in-button' variant="contained" color="success" onClick={() => verifiy()}>
                                    verifiy
                                </Button>
                            </Grid>
                        </Grid> */}

                    </div>

                }
            </div>

            <div
                onClick={() => { setFlip(!flip); codeSendSet(false) }} className="btn"
            >
                <span>Back </span>
            </div>
            <div hidden={true} id="reCAPTCHA"></div>
        </>

    );
}

export default SignInPhoneNumber;