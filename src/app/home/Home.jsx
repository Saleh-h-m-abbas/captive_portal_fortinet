import "./HomeCss.css";
import { useEffect, useState } from "react";
import FortinetForm from "../form/FortinetForm";
import Auth from "../auth/Auth";
import { addToFirebase } from "../../firebase/firebase";

const Home = () => {
  const [loginStatus, loginStatusSet] = useState(null);
  const [setVariables, setVariablesSet] = useState(0);
  const [postVal, postValSet] = useState(null);
  const [magicVal, magicValSet] = useState(null);
  const [usermacVal, usermacValSet] = useState(null);
  const [apmacVal, apmacValSet] = useState(null);
  const [apipVal, apipValSet] = useState(null);
  const [useripVal, useripValSet] = useState(null);
  const [ssidVal, ssidValSet] = useState(null);
  const [apnameVal, apnameValSet] = useState(null);
  const [bssidVal, bssidValSet] = useState(null);

  //Firebase Auth Data
  const [userData, userDataSet] = useState(null);

  useEffect(() => {
    if (setVariables === 0) {
      const queryParams = new URLSearchParams(window.location.search);
      postValSet(queryParams.get("post"));
      magicValSet(queryParams.get("magic"));
      usermacValSet(queryParams.get("usermac"));
      apmacValSet(queryParams.get("apmac"));
      apipValSet(queryParams.get("apip"));
      useripValSet(queryParams.get("userip"));
      ssidValSet(queryParams.get("ssid"));
      apnameValSet(queryParams.get("apname"));
      bssidValSet(queryParams.get("bssid"));
      setVariablesSet(1);
    }
    if (setVariables === 1) {
      window.history.replaceState({}, document.title, "/");
    }
    if (loginStatus !== null && loginStatus !== 0) {
      addToFirebase({
        loginStatus,
        postVal,
        magicVal,
        usermacVal,
        apmacVal,
        apipVal,
        useripVal,
        ssidVal,
        apnameVal,
        bssidVal,
        userData,
      });
      setTimeout(() => {
        console.log("You Are LogedIn successfuly Redirect...");
        document.forms[0].submit();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus, setVariables]);

  // console.log(magicVal);
  return (
    <div className="home_class">
      {loginStatus === "1" && (
        <FortinetForm
          values={{
            postVal,
            magicVal,
            usermacVal,
            apmacVal,
            apipVal,
            useripVal,
            ssidVal,
            apnameVal,
            bssidVal,
          }}
        />
      )}
      <Auth
        loginStatusSet={loginStatusSet}
        userDataSet={userDataSet}
        postVal={{ postVal }}
        magicVal={{ magicVal }}
      />
    </div>
  );
};

export default Home;
