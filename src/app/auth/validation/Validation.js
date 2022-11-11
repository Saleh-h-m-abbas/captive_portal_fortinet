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
    .min(9, "Phone number must be more than 8 digit")
    .max(9, "Phone number must be less than 10 digit")
    .required("Phone Number is required field"),
});

export const PhoneSignInCodeSchema = Yup.object().shape({
  code: Yup.string()
    .min(6, "Code must be more than 5 Numbers")
    .max(6, "Code must be less than 7 Numbers")
    .required("Phone Number is required field"),
});