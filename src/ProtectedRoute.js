import {Route, useHistory} from "react-router-dom";

const ProtectedRoute = ({isAuth, candidate, Component, ...rest}) => {
    const history = useHistory();
    return (
        <div>
            <Route 
            {...rest} 
            render={(props) => {
                if (isAuth){
                    if(candidate === false && localStorage.getItem("candidate")==="true") history.push("/dashboard")
                    return <Component />
                }else{
                    history.push("/login")
                }
            }}   
            /> 
        </div>
    )
    }

export default ProtectedRoute
