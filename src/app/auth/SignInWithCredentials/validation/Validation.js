import * as Yup from "yup";
export const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});
