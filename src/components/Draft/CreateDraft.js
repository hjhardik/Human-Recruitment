import React, {useState, useEffect} from "react";
import Button from "../Elements/Button";
import TextEditor from "../Elements/TextEditor";
import {serverURL} from "../../config";
const { useRef} = React;

const fetchFunc = async ({subRoute, sendData}) => {
    return await fetch(`${serverURL}/${subRoute}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
      })
        .then(data => data.json())
}

const CreateDraft= ({user, company, addContract, toggle}) => {
    const childRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [members, setMembers] = useState([]);
    const [contractName, setContractName] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([])

    useEffect(()=> {    
        const fetchMembers = async () => { 
            let candidates = await fetchFunc({subRoute: "findCompanyMembers", sendData: {company}});   
            console.log("candidates", candidates);
            if(candidates){
                setMembers(candidates);
            }
        }
        fetchMembers();
        // eslint-disable-next-line
     }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(members.length ===0){
            setErrorMessage("There are no candidates from your company");
            return
        }
        if(selectedMembers.length === 0 || contractName===""){
            setErrorMessage("Please fill out all fields");
            return
        }else{
            if(errorMessage)
            {   setErrorMessage(null)
            }    
            let draftContent = await childRef.current.convertContentToHTML();
            let res = await fetchFunc({subRoute: "createDraft", sendData: {user, company, contractName, selectedMembers, draftContent}})
            console.log(res);
            if(res.success){
                setSelectedMembers([])
                setContractName('')
                toggle(false)
                addContract(res.newContracts);
            }else{
                setErrorMessage(res.msg)
            }            
        }
    }

    const cancelHandler = (e) => {
        e.preventDefault();
        if(errorMessage)
        {   setErrorMessage(null)
        } 
        setSelectedMembers([])
        setContractName('')
        toggle(false)
    }

    const updateSelectedMembers = (memberName, isSelected) => {
        isSelected? setSelectedMembers([...selectedMembers, memberName])
        :
        setSelectedMembers(selectedMembers.filter( mem => mem !== memberName)) 
    }

    return(
        <>
        <br/>
        { errorMessage && <h4 className="error"> { errorMessage } </h4> }
        <br/>
        <div className="create-draft-form">
        <form onSubmit={(e) => submitHandler(e)}>
            <label>Select the members of your company for this contract</label>
            <div className='form-control'>
            { 
              members.map((member, idx) => (
                    <React.Fragment key={idx}>
                        <input type="checkbox" name={`member${idx}`} value={member} onChange={(e) => {updateSelectedMembers(e.currentTarget.value, e.currentTarget.checked);if(errorMessage)
        {   setErrorMessage(null)
        } ;}} />
                        <label htmlFor={idx}>{member}</label>
                        <br/>   
                    </React.Fragment>
                    ))
            }
            </div> 
            <br/>
            <div className='form-control'>
            <label>Name of Contract</label>
            <br/>
            <input
              type='text'
              placeholder='Enter contract name'
              value={contractName}
              onChange={(e) => {setContractName(e.target.value);if(errorMessage)
        {   setErrorMessage(null)
        } }}
            />
            </div>
            <br/>
            <TextEditor ref={childRef}/>
            <br/>
            <div className="create-draft-buttons">
            <div>
            <Button class="btn btn-primary" btnType="submit" text="Initiate Contract"/>
            <Button class="btn btn-danger" onClick={(e) => {cancelHandler(e);if(errorMessage){ setErrorMessage(null)}}} text="Cancel" color="red" /> 
            </div>
            </div>
            </form>          
        </div>
        </>      
    )
}
export default CreateDraft;