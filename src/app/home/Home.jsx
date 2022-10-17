
import "./HomeCss.css";
import { useEffect, useState } from "react";
import FortinetForm from "../form/FortinetForm";
import Auth from "../auth/Auth";
import { addToFirebase } from "../../firebase/firebase";

const Home = () => {
  const [loginStatus, loginStatusSet] = useState(null);
  const [setVariables, setVariablesSet] = useState(0);

  const [sourceIp, sourceIpSet] = useState(null);
  const [destIp, destIpSet] = useState(null);
  const [hostname, hostnameSet] = useState(null);
  const [service, serviceSet] = useState(null);
  const [magicId, magicIdSet] = useState(null);
  const [magicVal, magicValSet] = useState(null);
  const [redirId, redirIdSet] = useState(null);
  const [protUri, protUriSet] = useState(null);
  const [disclaimerAct, disclaimerActSet] = useState(null);
  const [disclaimerMethod, disclaimerMethodSet] = useState(null);
  const [answerId, answerIdSet] = useState(null);
  const [agreeVal, agreeValSet] = useState(null);
  const [declineVal, declineValSet] = useState(null);
  const [cpAuthSsid, cpAuthSsidSet] = useState(null);
  const [cpAuthIntf, cpAuthIntfSet] = useState(null);
  const [cn, cnSet] = useState(null);
  const [authority, authoritySet] = useState(null);
  const [startValid, startValidSet] = useState(null);
  const [endValid, endValidSet] = useState(null);
  const [expireDays, expireDaysSet] = useState(null);
  const [sourceSn, sourceSnSet] = useState(null);
  const [protoUri, protoUriSet] = useState(null);
  const [lastSuccessfulLogin, lastSuccessfulLoginSet] = useState(null);
  const [lastFailedLogin, lastFailedLoginSet] = useState(null);
  const [policyUuid, policyUuidSet] = useState(null);
  const [fgtHostname, fgtHostnameSet] = useState(null);
  const [userMac, userMacSet] = useState(null);
  const [userIp, userIpSet] = useState(null);
  const [apMac, apMacSet] = useState(null);
  const [apIp, apIpSet] = useState(null);
  const [apSsid, apSsidSet] = useState(null);
  const [apName, apNameSet] = useState(null);
  const [deviceType, deviceTypeSet] = useState(null);
  const [portalAddr, portalAddrSet] = useState(null);
  const [policyId, policyIdSet] = useState(null);

  const [userData, userDataSet] = useState(null);

  useEffect(() => {
    if (setVariables === 0) {
      const queryParams = new URLSearchParams(window.location.search);
      sourceIpSet(queryParams.get('source_ip'));
      destIpSet(queryParams.get('dest_ip'));
      hostnameSet(queryParams.get('hostname'));
      serviceSet(queryParams.get('service'));
      magicIdSet(queryParams.get('magicid'));
      magicValSet(queryParams.get('magicval'));
      redirIdSet(queryParams.get('redirid'));
      protUriSet(queryParams.get('proturi'));
      disclaimerActSet(queryParams.get('disclaimer_act'));
      disclaimerMethodSet(queryParams.get('disclaimer_method'));
      answerIdSet(queryParams.get('answerid'));
      agreeValSet(queryParams.get('agreeval'));
      declineValSet(queryParams.get('declineval'));
      cpAuthSsidSet(queryParams.get('cpauth_ssid'));
      cpAuthIntfSet(queryParams.get('cpauth_intf'));
      cnSet(queryParams.get('cn'));
      authoritySet(queryParams.get('authority'));
      startValidSet(queryParams.get('start_valid'));
      endValidSet(queryParams.get('end_valid'));
      expireDaysSet(queryParams.get('expiredays'));
      sourceSnSet(queryParams.get('source_sn'));
      protoUriSet(queryParams.get('protouri'));
      lastSuccessfulLoginSet(queryParams.get('last_successful_login'));
      lastFailedLoginSet(queryParams.get('last_failed_login'));
      policyUuidSet(queryParams.get('policy_uuid'));
      fgtHostnameSet(queryParams.get('fgt_hostname'));
      userMacSet(queryParams.get('user_mac'));
      userIpSet(queryParams.get('user_ip'));
      apMacSet(queryParams.get('ap_mac'));
      apIpSet(queryParams.get('ap_ip'));
      apSsidSet(queryParams.get('ap_ssid'));
      apNameSet(queryParams.get('ap_name'));
      deviceTypeSet(queryParams.get('device_type'));
      portalAddrSet(queryParams.get('portal_addr'));
      policyIdSet(queryParams.get('policy_id'));
      setVariablesSet(1);
    }
    if (setVariables === 1) {
      window.history.replaceState({}, document.title, "/");
    }
    if (loginStatus != null && loginStatus!=0) {
      addToFirebase({
        loginStatus,
        sourceIp,
        destIp,
        hostname,
        service,
        magicId,
        magicVal,
        redirId,
        protUri,
        disclaimerAct,
        disclaimerMethod,
        answerId,
        agreeVal,
        declineVal,
        cpAuthSsid,
        cpAuthIntf,
        cn,
        authority,
        startValid,
        endValid,
        expireDays,
        sourceSn,
        protoUri,
        lastSuccessfulLogin,
        lastFailedLogin,
        policyUuid,
        fgtHostname,
        userMac,
        userIp,
        apMac,
        apIp,
        apSsid,
        apName,
        deviceType,
        portalAddr,
        policyId,
        userData
      }
      );
      setTimeout(() => {
        console.log("You Are LogedIn successfuly Redirect...");
        document.forms[0].submit();
      }, 2000);
    }
  }, [loginStatus, setVariables]);
  return (
    <div className="home_class">
      {loginStatus === "1" && <FortinetForm values={{
        sourceIp,
        destIp,
        hostname,
        service,
        magicId,
        magicVal,
        redirId,
        protUri,
        disclaimerAct,
        disclaimerMethod,
        answerId,
        agreeVal,
        declineVal,
        cpAuthSsid,
        cpAuthIntf,
        cn,
        authority,
        startValid,
        endValid,
        expireDays,
        sourceSn,
        protoUri,
        lastSuccessfulLogin,
        lastFailedLogin,
        policyUuid,
        fgtHostname,
        userMac,
        userIp,
        apMac,
        apIp,
        apSsid,
        apName,
        deviceType,
        portalAddr,
        policyId,
        loginStatus
      }} />}
      <Auth loginStatusSet={loginStatusSet} agreeVal={{ agreeVal }} declineVal={{ declineVal }} userDataSet={userDataSet} />
    </div>
  );
};

export default Home;
