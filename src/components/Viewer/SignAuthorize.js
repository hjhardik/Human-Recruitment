import React,{useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import Button from "../Elements/Button";
import {serverURL} from "../../config";

const SignAuthorize = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);
    // eslint-disable-next-line
    const [content, setContent] = useState("OAUTH IN PROGRESS...");
    const [showEmail, setShowEmail] = useState(true);
    const [email, setEmail]= useState('');

    let {contract, candidate, code, api_access_point, web_access_point} = useParams();    

    const callFunc = async () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(! re.test(String(email).toLowerCase())){
            setErrorMessage("Please enter valid Email Id");
            return;
        }
        setErrorMessage(null);
        setShowEmail(false);
        if(code!==undefined || code!==null){
            console.log("redirecting ..")
            let redirectUrl = await fetch(`${serverURL}/signauth/redirect`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({contract, candidate, email, code, api_access_point, web_access_point})
            });
            console.log(redirectUrl);
            console.log(typeof(redirectUrl));
            window.open(redirectUrl);     
        }else{
        fetch(`${serverURL}/signauth/redirect`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({contract, candidate, email, code, api_access_point, web_access_point})
        })
    } 
    }
    
    return (
        <div className="jumbotron">
        { errorMessage && <h4 className="error"> { errorMessage } </h4> }
            {showEmail && (
                    <div>
                    <input
                        type="email"
                        placeholder='Enter Recipient Email'
                        value={email}
                        onChange={(e) => {setEmail(e.target.value);setErrorMessage(null);}}
                     />
                     <Button text="SUBMIT" class="btn btn-success" onClick={callFunc} />
                    </div>
                    )
            }
            <h3>{content}</h3>
        </div>
    )
}

export default SignAuthorize
