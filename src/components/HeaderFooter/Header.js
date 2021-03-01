import {useHistory} from "react-router-dom";

const Header = ({isAuth, setToken}) => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.clear();
        setToken({token: false, user: false, candidate:false, company:false })
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