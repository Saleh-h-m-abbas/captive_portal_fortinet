const FortinetForm = (props) => {
  return (
    <form action={props.values.postVal} method="post">
          
    <input type="hidden" name="magic" value={props.values.magicVal}/>
    
    <input type="hidden" id="username" name="username" value="captive_portal"/>
    
    <input type="hidden" id="password" name="password" value="Abcd@1234"/>
    
  </form>
  );
};

export default FortinetForm;
