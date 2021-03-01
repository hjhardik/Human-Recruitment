import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {serverURL} from "../../config";

async function registerUser(credentials) {
  return fetch(`${serverURL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


const Register = ({setToken}) => {
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [candidate, setCandidate] = useState(true)
  const [company, setCompany] = useState(false)

  const onRoleChangeCan = () => {
    if (errorMessage){
      setErrorMessage(null);
    }
    setCandidate(true)
    setCompany(false)
}   

  const onRoleChangeCom = () => {
    if (errorMessage){
      setErrorMessage(null);
    }
    setCandidate(false)
    setCompany(true)
  } 
  
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password || !confirmPassword || !companyName) {
      setErrorMessage('Please fill all fields')
      return
    }
    if (! (password === confirmPassword)){
      setErrorMessage('Password and confirm password do not match')
      return
    }
    if(candidate && (fullName=== "")){
      setErrorMessage('Enter full name')
      return
    }

    const token = await registerUser({userName, fullName, password, companyName, candidate})
    if(token.success){
      setToken(token);
      onRoleChangeCan();
      onRoleChangeCom();
      setUserName('');
      setFullName('');
      setPassword('');
      setCompanyName('');
      setConfirmPassword(''); 
      history.push("/dashboard");
    }else{
      setErrorMessage(token.msg)
    }
  }

    return(
     <>
     <br/>
    { errorMessage && <h4 className="error"> { errorMessage } </h4> } 
    <form className='add-form' onSubmit={(e)=> onSubmit(e)}>
    <h3 className="login-header">Register New Account</h3>
    <br/>
      <div className='form-control form-control-check'>
        <label>You are a </label><br/>
        <input type="radio" name="role" value="candidate" defaultChecked={candidate} onClick={onRoleChangeCan} />
        <label>  Candidate</label><br />
        <input type="radio" name="role" value="company" defaultChecked={company} onClick={onRoleChangeCom} />
        <label>  Company</label><br />
      </div>
      {candidate ? 
      <div>
      <div className='form-control'>
        <label>Full Name</label><br/>
        <input
          type='text'
          placeholder='Enter Name'
          value={fullName}
          onChange={(e) => {setFullName(e.target.value);if (errorMessage){
      setErrorMessage(null);
    };}}
        />
      </div>
      <div className='form-control'>
        <label>User Name</label><br/>
        <input
          type='text'
          placeholder='Enter User Name'
          value={userName}
          onChange={(e) => {setUserName(e.target.value);if (errorMessage){
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
      <div className='form-control'>
        <label>Confirm Password</label><br/>
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => {setConfirmPassword(e.target.value);if (errorMessage){
      setErrorMessage(null);
    }}}
        />
      </div>
      <div className='form-control'>
        <label>Enter Company Name</label><br/>
        <input
          type='text'
          placeholder='Enter Company Name'
          value={companyName}
          onChange={(e) => {setCompanyName(e.target.value);if (errorMessage){
      setErrorMessage(null);
    }}}
        />
      </div>
      </div>
      : 
      <div>
      <div className='form-control'>
        <label>Enter Company Name</label><br/>
        <input
          type='text'
          placeholder='Enter Company Name'
          value={companyName}
          onChange={(e) => {setCompanyName(e.target.value);if (errorMessage){
      setErrorMessage(null);
    }}}
        />
      </div>
      <div className='form-control'>
        <label>User Name</label><br/>
        <input
          type='text'
          placeholder='Enter User Name'
          value={userName}
          onChange={(e) => {setUserName(e.target.value);if (errorMessage){
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
      <div className='form-control'>
        <label>Confirm Password</label><br/>
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => {setConfirmPassword(e.target.value);if (errorMessage){
      setErrorMessage(null);
    }}}
        />
      </div>
      </div>} 
      
        <br/>
      <input type='submit' value='REGISTER' className='btn btn-block' />
    </form>
    <div>
        <p>Already Registered ?</p>
        <Link to='/login'>Login</Link>
        </div>
    </>
    )
}

export default Register