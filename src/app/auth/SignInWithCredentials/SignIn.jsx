import "./SignIn.css";
import { SignInSchema } from "./validation/Validation";
import { Formik } from "formik";
const SignIn = ({magicVal,postVal}) => {
  return (
    <>
      <Formik
        validationSchema={SignInSchema}
        initialValues={{ username: "", password: "", isSubmitting: false }}
        onSubmit={(values, { setSubmitting }) => {
          document.forms[0].submit();
          setSubmitting(true);
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

                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="Enter Username"
                  className="username"
                  id="username"
                />
                {errors.username && (
                  <p className="error">
                    {errors.username && touched.username && errors.username}
                  </p>
                )}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="password"
                />
                {errors.password && (
                  <p className="error">
                    {errors.password && touched.password && errors.password}
                  </p>
                )}
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
