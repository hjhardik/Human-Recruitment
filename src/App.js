import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './App.css';
import Header from "./components/HeaderFooter/Header";
import Footer from "./components/HeaderFooter/Footer";
import Register from "./components/SignIn/Register";
import Login from "./components/SignIn/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./components/Draft/Dashboard";
import UserToken from "./UserToken";
import Viewer from './components/Viewer/Viewer';
import EditContract from './components/Viewer/EditContract';
import SignAuthorize from './components/Viewer/SignAuthorize';

function App() {
  const {token, setToken} = UserToken();
  return (
    <Router>
        <Route exact path="/">
            <Redirect to="/login"></Redirect>
        </Route>
        <div className="App">
        <Header isAuth={token} setToken={setToken} />
        <Route exact path="/login">{token? <Redirect to="/dashboard"></Redirect>: <Login setToken={setToken} />}</Route>
        <Route exact path="/register">{token? <Redirect to="/dashboard"></Redirect> : <Register setToken={setToken} />}</Route>
        <ProtectedRoute exact path="/dashboard" Component={Dashboard} isAuth={token} />
        <ProtectedRoute path="/viewcontract/:candidate/:contract" Component={Viewer} isAuth={token} />
        <ProtectedRoute path="/editcontract/:candidate/:contract" Component={EditContract} isAuth={token} candidate={false} />
        <ProtectedRoute path="/signcontract" Component={SignAuthorize} isAuth={token} />
        <Footer />
        </div>
    </Router>
  );
}

export default App;
