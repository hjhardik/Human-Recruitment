//handles the signing of PDF contract by company user
// when company user clicks on sign contract, redirects to OAUTH by adobe account,
// and then generates code and access/refresh tokens and then sends the document to be
// signed through TRANSIENT DOCUMENT and generates an AGREEMENT, which later will be used 
// to create a signing URL, which will then be sent to the candidate for signing
import React,{useState} from 'react';
import Button from "../Elements/Button";
import {serverURL} from "../../config";

const SignAuthorize = (props) => {
    const [errorMessage, setErrorMessage] = useState(null);
    // eslint-disable-next-line
    const [content, setContent] = useState("OAUTH IN PROGRESS...");
    // RECIPIENT EMAIL ADDRESS for sending contract through transient document 
    const [showEmail, setShowEmail] = useState(true);
    const [email, setEmail]= useState('');

    // get the query string parameters
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const contract = params.get('contract');
    const candidate = params.get('candidate');
    const code = params.get('code');
    const state = params.get('state');
    const api_access_point = params.get('api_access_point');

    const callFunc = async () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(! re.test(String(email).toLowerCase())){
            setErrorMessage("Please enter valid Email Id");
            return;
        }
        setErrorMessage(null);
        setShowEmail(false);
        if(code === null || code === undefined){
            let redirectUrl = await fetch(`${serverURL}/signauth/redirect`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({contract, candidate, email, code, state, api_access_point})
            }).then((data)=>data.json());

            window.open(redirectUrl.data, "_self");  

        }else{
        let res = await fetch(`${serverURL}/signauth/redirect`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({contract, candidate, email, code, state, api_access_point})
        }).then((data)=>data.json());
        if(res.success){
            setContent('Authorization successful. Contract sent.') 
        }else{
            setErrorMessage(res.msg);
        }  
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
