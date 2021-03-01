import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {serverURL} from "../../config";

async function loginUser(credentials) {
  return await fetch(`${serverURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

const Login = ({setToken}) => {
    let history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);
    const [userName, setuserName] = useState('')
    const [password, setPassword] = useState('')
    const [candidate, setCandidate] = useState(true)
    const [company, setCompany] = useState(false)

  const onRoleChangeCan = (e) => {
    if (errorMessage){
      setErrorMessage(null)
    }
    setCandidate(true)
    setCompany(false)
}   

  const onRoleChangeCom = (e) => {
    if (errorMessage){
      setErrorMessage(null)
    }
    setCandidate(false)
    setCompany(true)
  } 
  
  const onSubmit = async (e) => {
    e.preventDefault()

    if (!userName || !password) {
      setErrorMessage(('Please fill out all fields'));
        return
    }

    const token = await loginUser({
           userName,
           password,
           candidate,
    }); 
    if(token.success){
      setToken(token);
      setuserName('');
      setPassword('');
      setCandidate(true);
      setCompany(false);
      history.push("/dashboard");
    }else{
      setErrorMessage(token.msg);
    }     
    
  }
    return(
        <>
        <br/>
        { errorMessage && <h4 className="error"> { errorMessage } </h4> }
        <form className='add-form' onSubmit={onSubmit}>
        <h3 className="login-header">Log In to your Account</h3>
        <br/> 
          <div>
          <div className='form-control'>
            <label>User Name</label><br/>
            <input
              type='text'
              placeholder='Enter User Name'
              value={userName}
              onChange={(e) => {setuserName(e.target.value);if (errorMessage){
      setErrorMessage(null);
    }}}
            />
          </div>
          <div className='form-control'>
            <label>Password</label><br/>
            <input
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => {setPassword(e.target.value);if (errorMessage){
      setErrorMessage(null);
    }}}
            />
          </div>
          <div className='form-control form-control-check'>
            <label>You are a </label><br/>
            <input type="radio" name="role" value="candidate" defaultChecked={candidate} onClick={onRoleChangeCan} />
            <label> Candidate</label><br />
            <input type="radio" name="role" value="company" defaultChecked={company} onClick={onRoleChangeCom} />
            <label> Company</label><br />
          </div>
          </div>
          <br/>
          <input type='submit' value='LOG IN' className='btn btn-block' />
        </form>
        <div>
          <p>New User ?</p>
          <Link to='/register'>Register New User</Link>
        </div>
        </>
        )
}

export default Login