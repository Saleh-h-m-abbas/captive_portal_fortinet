const FortinetForm = (props) => {
  return (
    <form action={`http://${props.values.portalAddr}:1000/fgtauth?${props.values.magicVal}`} method={props.values.disclaimerMethod}>
      
      <input type='hidden' name='source_ip' value={props.values.sourceIp} />
      <input type='hidden' name='dest_ip' value={props.values.destIp} />
      <input type='hidden' name='hostname' value={props.values.hostname} />
      <input type='hidden' name='service' value={props.values.service} />
      <input type='hidden' name={props.values.magicId} value={props.values.magicVal} />
      <input type='hidden' name={props.values.redirId} value={props.values.protUri} />
      <input type='hidden' name='disclaimer_act' value={props.values.disclaimerAct} />
      <input type='hidden' name='disclaimer_method' value={props.values.disclaimerMethod} />
      <input type="hidden" name={props.values.answerId} value={props.values.loginStatus} />
      {/* <input type='hidden' name='agreeval' value={props.values.agreeVal} /> */}
      {/* <input type='hidden' name='declineval' value={props.values.declineVal} /> */}
      <input type='hidden' name='cpauth_ssid' value={props.values.cpAuthSsid} />
      <input type='hidden' name='cpauth_intf' value={props.values.cpAuthIntf} />
      <input type='hidden' name='cn' value={props.values.cn} />
      <input type='hidden' name='authority' value={props.values.authority} />
      <input type='hidden' name='start_valid' value={props.values.startValid} />
      <input type='hidden' name='end_valid' value={props.values.endValid} />
      <input type='hidden' name='expiredays' value={props.values.expireDays} />
      <input type='hidden' name='source_sn' value={props.values.sourceSn} />
      <input type='hidden' name='protouri' value={props.values.protoUri} />
      <input type='hidden' name='last_successful_login' value={props.values.lastSuccessfulLogin} />
      <input type='hidden' name='last_failed_login' value={props.values.lastFailedLogin} />
      <input type='hidden' name='policy_uuid' value={props.values.policyUuid} />
      <input type='hidden' name='fgt_hostname' value={props.values.fgtHostname} />
      <input type='hidden' name='user_mac' value={props.values.userMac} />
      <input type='hidden' name='user_ip' value={props.values.userIp} />
      <input type='hidden' name='ap_mac' value={props.values.apMac} />
      <input type='hidden' name='ap_ip' value={props.values.apIp} />
      <input type='hidden' name='ap_ssid' value={props.values.apSsid} />
      <input type='hidden' name='ap_name' value={props.values.apName} />
      <input type='hidden' name='device_type' value={props.values.deviceType} />
      <input type='hidden' name='portal_addr' value={props.values.portalAddr} />
      <input type='hidden' name='policy_id' value={props.values.policyId} />
      <input type='hidden' name='userid' value={"Saleh"} />
      <input type='hidden' name='username' value={"abbas"} />
    
      
    </form>
  );
};

export default FortinetForm;
