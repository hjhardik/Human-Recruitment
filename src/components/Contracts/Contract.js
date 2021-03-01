import {useState, useEffect} from "react";
import Button from "../Elements/Button"
import {Link, useHistory} from "react-router-dom";
import {serverURL} from "../../config";

const modifyStatus = async (creator, candidate, contract, status) => {
    return await fetch(`${serverURL}/modifystatus/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({creator, candidate, contract, status})
      }).then((data)=> data.json())
}

const Contract = ({content, id, onDelete}) => {
    const history = useHistory();
    const [newContent, setNewContent] = useState(content);
    let [status, setStatus ] = useState(newContent.status);

    useEffect(() => {
        setNewContent(content)
        setStatus(content.status)
    }, [content,id]);

    const editContract = (id) =>{
        history.push({
            pathname: `/editContract/${newContent.candidateName}/${newContent.contractName}`,
            state: { data: newContent.draftContent }
        })
    }
    const deleteContract = async (id) => {
        let success = await modifyStatus(newContent.creator, newContent.candidateName, newContent.contractName, 10)
        if(success.success) onDelete(id)
    }
    const approveContract = async(isCompany, id) => {
        if(isCompany){
            let success = await modifyStatus(newContent.creator, newContent.candidateName, newContent.contractName, 4)
            if(success.success) setStatus(4);
        }else{
            let success = await modifyStatus(newContent.creator, newContent.candidateName, newContent.contractName, status+1)
            if(success.success) setStatus(status+1);
        }
    }
    const disapproveContract = async(isCompany, id) => {
        if(isCompany){
            let success = await modifyStatus(newContent.creator, newContent.candidateName, newContent.contractName, 2)        
            if(success.success) setStatus(2);
        }else{
            let success = await modifyStatus(newContent.creator, newContent.candidateName, newContent.contractName, status-1)        
            if(success.success) setStatus(status-1);
        }
        
    }
    const finalizeContract = async (id) => {
        let success = await modifyStatus(newContent.creator, newContent.candidateName, newContent.contractName, 1)
        if(success.success) setStatus(status+1);
    }
    const signContract = async(isCompany, id) => {
        if(isCompany){
            window.open(`/signcontract/${newContent.candidateName}/${newContent.contractName}`, "_blank");
        }else{
            console.log("Sign clicked by candidate")
        }
        // let success = await modifyStatus(newContent.creator, newContent.candidateName, newContent.contractName, status+1)
        // if(success.success) setStatus(status+1);
    }
    return (
        <tr>
            <td><Link to={`/viewcontract/${newContent.candidateName}/${newContent.contractName}`}>{newContent.contractName.toUpperCase()}</Link></td>
            <td>{newContent.company}</td>
            <td>{newContent.candidateName}</td>
            <td>
            <>
            {status===0 && "DRAFT"}
            {status===1 && "FINALIZED"}
            {status===2 && "APPROVED BY CANDIDATE"}
            {status===3 && "APPROVED BY COMPANY"}
            {status===4 && "APPROVED"}
            {status===5 && "SIGNED"}
            </>
            </td>       
            <td>
                <>
                {localStorage.getItem('candidate')==="false" && status===0 && <Button class="tableButton btn btn-dark" text="Edit" onClick={()=>editContract(id)}/>}
                {localStorage.getItem('candidate')==="false" && status===0 && <Button class="tableButton btn btn-primary" text="Finalize" onClick={()=> finalizeContract(id)}/>}
                {localStorage.getItem('candidate')==="true" && status===1 && <Button class="tableButton btn btn-success" text="APPROVE BY CANDIDATE" onClick={()=> approveContract(false, id)}/>}
                {localStorage.getItem('candidate')==="false" && status===1 && "Waiting for candidate to approve. Check comments/annotations in contract viewer."}
                {localStorage.getItem('candidate')==="false" && status===2 && <Button class="tableButton btn btn-success" text="APPROVE BY COMPANY" onClick={()=> approveContract(true, id)}/>}
                {localStorage.getItem('candidate')==="true" && status===2 && "Waiting for company to approve. Check comments/annotations in contract viewer."}
                {(status >= 2 && status <= 4) && localStorage.getItem('candidate')==="true" && <Button class="tableButton btn btn-outline-danger" text="CANCEL APPROVAL" onClick={()=> disapproveContract(false, id) }/>}
                {(status === 3 || status === 4) && localStorage.getItem('candidate')==="false" && <Button class="tableButton btn btn-outline-danger" text="CANCEL APPROVAL" onClick={()=> disapproveContract(true, id) }/>}
                {localStorage.getItem('candidate')==="true" && status===4 && <Button class="tableButton btn btn-success" text="SIGN" onClick={()=> signContract(false, id)}/>} 
                {localStorage.getItem('candidate')==="false" && status===4 && <Button class="tableButton btn btn-success" text="SIGN" onClick={()=> signContract(true, id)}/>} 
                {localStorage.getItem('candidate')==="false" && status===0 && <Button class="tableButton btn btn-danger" text="Delete" onClick={()=> deleteContract(newContent._id) }/>}
                {status===6 && <Button text="CONTRACT ESTABLISHED" color="pink" />}
                </>
            </td>
        </tr>
    )
}

export default Contract