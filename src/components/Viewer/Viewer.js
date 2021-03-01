// handles the contract(PDF) viewer
import React,{useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {serverURL} from "../../config";

const Viewer = () => {
    let {candidate, contract} = useParams();
    const [draftContent, setDraftContent] = useState("");

    //findContent function helps to determine when the content of the contract is changed
    const findContent = async () => {
      let res = await fetch(`${serverURL}/finddraftcontent/`, {
            method: 'POST',
            headers: {
              Accept: "application/json",
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({candidate, contract})
          }).then((data)=> data.json())   
      return res.content
    }

    // Checks after every three seconds, if the content of contract PDF is changed
    // if changed, it automatically re renders the PDF so that new changes can be viewed seamlessly
    setInterval(async () => {
        let newDraft = await findContent(candidate, contract);
        if(newDraft !== null || newDraft !== undefined){
          if(newDraft.localeCompare(draftContent) !== 0){
            setDraftContent(newDraft);
          }
        }
      }, 3000)
    
    // attach external JS file for PDF view  
    useEffect(() => {
        const firstScript = document.createElement('script');
        firstScript.src = "https://documentcloud.adobe.com/view-sdk/main.js";
        firstScript.async = true;
        firstScript.type="text/javascript";
        const secondScript = document.createElement('script');
        secondScript.src = "/adobeview.js";
        secondScript.async = true;
        secondScript.type="text/javascript";
        document.body.appendChild(firstScript);
        document.body.appendChild(secondScript);
      return () => {
          document.body.removeChild(firstScript);
          document.body.removeChild(secondScript);
        }
      }, [draftContent]);
    return (
        <div id="pdfviewercontainer" candidate={`${candidate}`} contract={`${contract}`}>
            <div id="adobe-dc-view"></div>
        </div>
    )
}

export default Viewer
