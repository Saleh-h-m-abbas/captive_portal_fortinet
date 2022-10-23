import {createButton} from "react-social-login-buttons";
import "./Button.css"
// const config = {
//   text: "User and Password",
//   icon: "phone",
//   iconFormat: name => `fa fa-${name}`,
//   style: { background: "#1FA26B" },
//   activeStyle: { background: "#1F9632" }
// };
// /** My Facebook login button. */
// const UserButton = createButton(config);
const UserButton=()=>{

  return(<>
    <input className="username" placeholder="Username" ></input>
    <br/>
    <input className="password" placeholder="Password"></input>
    <br/>
    <button class="button" ><span>Sign In </span></button>
    <div style={{"color":"#FFFFFF"}}>@2022 PowerEye</div>
  </>)
}

export default UserButton;