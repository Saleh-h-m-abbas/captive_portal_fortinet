import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from '../../../firebase/firebase';
import "./SignInWithPhoneNumber.css";
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { Formik } from 'formik';
import { PhoneSignInSchema } from '../validation/Validation';

const SignInPhoneNumber = ({ loadingSet, loginStatusSet, userDataSet, codeSendSet, codeSend, flip, setFlip }) => {
    // const [countryCode, countryCodeSet] = useState();
    // const [phoneNumber, phoneNumberSet] = useState('');
    // const [veririficationCode, veririficationCodeSet] = useState(false);

    // const handleChange = (event) => {
    //     countryCodeSet(event.target.value);
    // };

    // const verifiy = () => {
    //     loadingSet(true);
    //     let confirmationResult = window.confirmationResult;

    //     confirmationResult.confirm(veririficationCode).then((result) => {
    //         const user = result.user;
    //         console.log(user);
    //         console.log("Login Succssfuly ");
    //         loadingSet(false);
    //         loginStatusSet("1");
    //     }).catch((error) => {
    //         loadingSet(false);
    //         loginStatusSet("0");
    //         console.log(error);

    //     });
    // }
    return (
        <>
            <div>
                {!codeSend && 
                    <Formik
                        validationSchema={PhoneSignInSchema}
                        initialValues={{ countryCode: '+970', phoneNumber: ""}}
                        onSubmit={(values, { setSubmitting },event) => {
                            // event.preventDefult();

                            loadingSet(true);
                            const fullNumber = values.countryCode + String(values.phoneNumber);
                            console.log(fullNumber);
                            window.recaptchaVerifier = new RecaptchaVerifier('reCAPTCHA', {
                                'size': 'invisible',
                                'callback': (response) => {
                                }
                            }, auth);

                            let appVerifier = window.recaptchaVerifier;

                            signInWithPhoneNumber(auth, fullNumber, appVerifier)
                                .then((confirmationResult) => {
                                    window.confirmationResult = confirmationResult;
                                    console.log(confirmationResult);
                                    codeSendSet(true);
                                    loadingSet(false);
                                }).catch((error) => {
                                    console.log(error);
                                    codeSendSet(false);
                                    loadingSet(false);
                                });
                            setSubmitting(true);
                            loadingSet(false);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form
                            
                            onSubmit={handleSubmit}
                           
                            
                            >
                                <Stack display="flex" justifyContent="center" alignItems="center" direction={'row'} spacing={2}>
                                    <FormControl variant="filled" sx={{ maxWidth: 120, width: "30%" }}>
                                        <InputLabel id="country_code-label">Country Code</InputLabel>
                                        <Select
                                            labelId="country_code-label"
                                            id="countryCode"
                                            className='select-country'
                                            value={values.countryCode}
                                            name='countryCode'
                                            inputProps={{
                                                style: { backgroundColor: "white" }
                                            }}
                                            defaultValue="+970"
                                            size='small'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value={"+970"}>+970</MenuItem>
                                            <MenuItem value={"+972"}>+972</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField type={'number'}
                                        name="phoneNumber"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        size="small"
                                        InputProps={{ style: { backgroundColor: "white" }, }}
                                        value={values.phoneNumber}
                                        error={errors.phoneNumber && touched.phoneNumber}
                                        helperText={!errors.phoneNumber || !touched.phoneNumber ? "" : errors.phoneNumber}
                                        id="phoneNumber" label="Phone Number" variant="filled" />
                                </Stack>
                                <button
                                    className="btn"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    <span>Sign In </span>
                                </button>
                            </form>
                        )}
                    </Formik>

                }










                {/* V */}
                {codeSend &&
                    <div>
                        <Stack display="flex" justifyContent="center" alignItems="center" direction={'row'} spacing={2}>
                            <TextField type={'number'}
                                name="code_verirification"
                                // onBlur={handleBlur}
                                // onInput={(e) => {
                                //     e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                                //     veririficationCodeSet(e.target.value);
                                // }}
                                size="small"
                                InputProps={{ style: { backgroundColor: "white" }, }}
                                // value={values.password}
                                // error={errors.password && touched.password}
                                // helperText={!errors.password || !touched.password ? "" : errors.password}
                                id="code_verirification" label="Code Verirification" variant="filled" required />
                        </Stack>

                        <button id='sign-in-button' className='btn' variant="contained" color="success" >
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