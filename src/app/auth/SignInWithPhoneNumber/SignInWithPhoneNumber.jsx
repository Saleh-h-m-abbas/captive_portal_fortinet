import { useState } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from '../../../firebase/firebase';
import "./SignInWithPhoneNumber.css";
import { Box, FormControl, InputLabel, MenuItem, NativeSelect, Select, TextField } from '@mui/material';
import { Stack } from '@mui/system';

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
                    <Stack direction={'row'} spacing={2}>
                        {/* <FormControl sx={{ minWidth: 120 }}>

                            <InputLabel id="country_code">Country Code</InputLabel>

                            <NativeSelect
                                defaultValue="+970"
                                onChange={handleChange}
                                label="Age"
                                size='small'
                                value={countryCode}
                                inputProps={{
                                    name: 'country_code',
                                    id: 'country_code',
                                    style: { backgroundColor: "white" }
                                }}
                            >
                                <option value={"+970"}>+970</option >
                                <option value={"+972"}>+972</MenuItem >
                            </NativeSelect>
                        </FormControl> */}

                        <FormControl variant="filled"  sx={{  minWidth: 140 }}>
                            <InputLabel id="demo-simple-select-filled-label">Country Code</InputLabel>
                            <Select
                                InputProps={{ style: { backgroundColor: "white" }, }}
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                //   value={age}
                                inputProps={{
                                    style: { backgroundColor: "white" }
                                }}
                                defaultValue="+970"
                                size='small'
                                onChange={handleChange}
                            >
                                <MenuItem value={"+970"}>+970</MenuItem>
                                <MenuItem value={"+972"}>+972</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField type={'number'}
                            name="phoneNumber"
                            // onBlur={handleBlur}
                            onChange={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 9)
                                phoneNumberSet(e.target.value);
                            }}
                            size="small"
                            InputProps={{ style: { backgroundColor: "white" }, }}
                            // value={values.password}
                            // error={errors.password && touched.password}
                            // helperText={!errors.password || !touched.password ? "" : errors.password}
                            id="phoneNumber" label="Phone Number" variant="filled" />
                    </Stack>

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