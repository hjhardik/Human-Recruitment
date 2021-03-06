// handles the browser local storage of token and other details
import { useState } from 'react';

const UserToken = () => {
  const getToken = () => {
    // checks if token is present i.e. user is logged in
    let token = localStorage.getItem('token');
    if(token === "false"){
      return null
    }else{
      return token
    } 
  };

  const [token, setToken] = useState(getToken());
  //saveToken saves the token and user details inside the local storage of browser
  const saveToken = ({token, user, candidate, company}) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    localStorage.setItem('candidate', candidate);
    localStorage.setItem('company',company);
    setToken(token);
  };

  return {
    setToken: saveToken,
    token,
  }
}

export default UserToken