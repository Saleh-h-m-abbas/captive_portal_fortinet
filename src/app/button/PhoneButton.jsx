import {createButton} from "react-social-login-buttons";

const config = {
  text: "Sign in with Phone",
  icon: "FaFacebookF",
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#1FA26B" },
  activeStyle: { background: "#1F9632" }
};
/** My Facebook login button. */
const PhoneButton = createButton(config);

export default PhoneButton;