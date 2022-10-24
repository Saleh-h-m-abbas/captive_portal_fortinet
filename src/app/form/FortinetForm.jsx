const FortinetForm = (props) => {
  return (
    <form action={props.values.postVal} method="post">
          
    <input type="hidden" name="magic" value={props.values.magicVal}/>
    
    <input type="hidden" id="username" name="username" value="captive_portal2"/>
    
    <input type="hidden" id="password" name="password" value="Abcd@12341"/>
    
  </form>
  );
};

export default FortinetForm;
