import React,{useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {serverURL} from "../../config";

const Viewer = () => {
    let {candidate, contract} = useParams();
    const [draftContent, setDraftContent] = useState("");

    const findContent = async () => {
      let res = await fetch(`${serverURL}/finddraftcontent/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({candidate, contract})
          }).then((data)=> data.json())   
      return res.content
    }

    setInterval(async () => {
        let newDraft = await findContent(candidate, contract);
        if(newDraft !== null){
          if(newDraft.localeCompare(draftContent) !== 0){
            setDraftContent(newDraft);
          }
        }
      },4000)
    
    useEffect(() => {
        const firstScript = document.createElement('script');
        firstScript.src = "https://documentcloud.adobe.com/view-sdk/main.js";
        firstScript.async = true;
        firstScript.type="text/javascript";
        const secondScript = document.createElement('script');
        secondScript.src = "%PUBLIC_URL%/adobeview.js";
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
