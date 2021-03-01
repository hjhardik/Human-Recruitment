// handles all the protected routes
// if the user is logged in, display the routes otherwise redirect to login
import {Route, useHistory} from "react-router-dom";

//isAuth:Boolean representing if user is logged in or not
//candidate:Boolean representing if user is candidate or company user
//component is the component which was intended
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
