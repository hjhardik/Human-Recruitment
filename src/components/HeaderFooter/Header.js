import {useHistory} from "react-router-dom";

const Header = ({isAuth, setToken}) => {
    const history = useHistory();

    //logout button
    const handleLogout = () => {
        //clears token and user info
        localStorage.clear();
        // setToken value to false
        setToken({token: false, user: false, candidate:false, company:false })
        //redirect to login route
        history.push("/login"); 
    }
    return(
        <div className="container header">
            <div className="header-center">
                Human Recruitment Signing Platform
            </div>
            {true && <button className="btn btn-light" onClick={handleLogout}>Logout</button>}
        </div>
    )
}

export default Header;