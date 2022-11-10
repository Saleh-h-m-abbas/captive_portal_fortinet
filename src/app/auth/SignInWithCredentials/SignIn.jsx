import "./SignIn.css";
import { SignInSchema } from "../validation/Validation";
import { Formik } from "formik";
import { TextField } from "@mui/material";
import { Stack } from "@mui/system";

const SignIn = ({ magicVal, postVal, loadingSet }) => {

  return (
    <>
      <Formik
        validationSchema={SignInSchema}
        initialValues={{ username: "", password: "", isSubmitting: false }}
        onSubmit={(values, { setSubmitting }) => {
          loadingSet(true);
          document.forms[0].submit();
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
          <div className="login">
            <div className="form">
              <form
                noValidate
                onSubmit={handleSubmit}
                action={postVal.postVal}
                method="post"
              >
                <input
                  type="hidden"
                  name="magic"
                  value={magicVal.magicVal}
                />
                <Stack container  spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <TextField type={'text'}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    size="small"
                    InputProps={{ style: { backgroundColor: "white", }, }}
                    error={errors.username && touched.username}
                    helperText={!errors.username || !touched.username ? "" : errors.username}
                    id="username" label="Username" variant="filled" />

                  <TextField type={'password'}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    InputProps={{ style: { backgroundColor: "white" }, }}
                    value={values.password}
                    error={errors.password && touched.password}
                    helperText={!errors.password || !touched.password ? "" : errors.password}
                    id="password" label="Password" variant="filled" />

                </Stack>
                <button
                  className="submit-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>Sign In </span>
                </button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
