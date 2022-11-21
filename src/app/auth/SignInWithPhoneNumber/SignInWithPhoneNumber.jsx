import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from '../../../firebase/firebase';
import "./SignInWithPhoneNumber.css";
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { Formik } from 'formik';
import { PhoneSignInSchema, PhoneSignInCodeSchema } from '../validation/Validation';
import { useState } from "react";

const SignInPhoneNumber = ({ loadingSet, loginStatusSet, userDataSet, codeSendSet, codeSend }) => {
    const [submitRequest, setSubmitRequest] = useState(false);


    const verifiy = (values) => {
        loadingSet(true);
        setSubmitRequest(true);

        let confirmationResult = window.confirmationResult;

        confirmationResult.confirm(values.code).then((result) => {
            const user = result.user;
            userDataSet({phoneNumber:user.phoneNumber,code: values.code,authType:"phone"});
            console.log("Login Succssfuly ");
            loginStatusSet("1");
        }).catch((error) => {
            loginStatusSet("0");
            console.log(error);
            setSubmitRequest(false);

        });
    }

    const SendSMS = (values) => {
        loadingSet(true);
        setSubmitRequest(true);
        const fullNumber = values.countryCode + String(values.phoneNumber);
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('reCAPTCHA', {
                'size': 'invisible',
                'callback': (response) => {
                }
            }, auth);
        }


        let appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, fullNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                // console.log(confirmationResult);
                codeSendSet(true);
                loadingSet(false);
                setSubmitRequest(false);
            }).catch((error) => {
                console.log(error);
                //TODO::PleaseTryAgain
                codeSendSet(false);
                loadingSet(false);
                setSubmitRequest(false);
            });
    }
    return (
        <>
            <div>
                {!codeSend &&
                    <Formik
                        validationSchema={PhoneSignInSchema}
                        initialValues={{ countryCode: '+970', phoneNumber: "" }}
                        onSubmit={(values, { setSubmitting }) => SendSMS(values)}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit} >
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
                                        // helperText={!errors.phoneNumber || !touched.phoneNumber ? "" : errors.phoneNumber}
                                        id="phoneNumber" label="Phone Number" variant="filled" />
                                </Stack>
                                <br/>
                                {errors.phoneNumber && touched.phoneNumber && <div className="error">{!errors.phoneNumber || !touched.phoneNumber ? "" : errors.phoneNumber}</div>}
                                <button
                                    className="btn"
                                    type="submit"
                                    disabled={submitRequest}
                                >
                                    <span>Sign In </span>
                                </button>
                            </form>
                        )}
                    </Formik>
                }




                {codeSend &&
                    <Formik
                        validationSchema={PhoneSignInCodeSchema}
                        initialValues={{ code: '' }}
                        onSubmit={(values) => verifiy(values)}
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
                            <form onSubmit={handleSubmit} >
                                <Stack display="flex" justifyContent="center" alignItems="center" direction={'row'} spacing={2}>
                                    <TextField type={'number'}
                                        name="code"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        size="small"
                                        InputProps={{ style: { backgroundColor: "white" }, }}
                                        value={values.code}
                                        error={errors.code && touched.code}
                                        helperText={!errors.code || !touched.code ? "" : errors.code}
                                        id="code" label="Code Verirification" variant="filled" required />
                                </Stack>
                                <button
                                    className="btn"
                                    type="submit"
                                    disabled={submitRequest}
                                >
                                    <span>Verifiy </span>
                                </button>
                            </form>
                        )}
                    </Formik>

                }
            </div>


            <div hidden={true} id="reCAPTCHA"></div>
        </>

    );
}

export default SignInPhoneNumber;