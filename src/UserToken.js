import { useState } from 'react';

const UserToken = () => {
  const getToken = () => {
    let token = localStorage.getItem('token');
    if(token === "false"){
      return null
    }else{
      return token
    } 
  };

  const [token, setToken] = useState(getToken());

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