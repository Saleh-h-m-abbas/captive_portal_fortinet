import { useEffect, useState } from "react";

const RedirectPage = () => {
    const [titlePars, setTitlepars] = useState();
    const [setVariables, setVariablesSet] = useState(0);
    useEffect(() => {
        if (setVariables === 0) {
            setTitlepars(window.location.search.substr(1));
            setVariablesSet(1);
        }
        if (setVariables === 1) {
            window.history.replaceState({}, document.title, "/home");
            window.open(`https://www.powereye.ga/?${titlePars}`, '_blank');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setVariables]);
   return ( <>
        {/* <a href={`https://www.powereye.ga/?${titlePars}`} target="_blank">WordPress Homepage</a> */}
        <h3>Redirecting...</h3>
    </>)
}

export default RedirectPage;