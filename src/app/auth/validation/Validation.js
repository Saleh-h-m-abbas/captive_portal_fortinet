import * as Yup from "yup";
export const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Username is required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});


export const PhoneSignInSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(8, "Code must be 9 Numbers")
    .max(9, "Code must be 9 Numbers")
    .required("Phone Number is required field"),
});
    // countryCode: Yup.string()
    // .min(5, "Code must be 6 Numbers")
    // .max(7, "Code must be 6 Numbers")
    // .required("Code is a required field")
    // .min(8, "Code must be 6 Numbers"),