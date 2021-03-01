// handles editing of contract 
// company user can change the input, delete contract pages, reorder pages etc.
import Button from "../Elements/Button"
import TextEditor from "../Elements/TextEditor";
import {useHistory, useParams, useLocation} from "react-router-dom";
import React,{useState} from "react";
import {serverURL} from "../../config";
const { useRef} = React;

const EditContract = (props) => {
    const childRef = useRef();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');
    let creator = localStorage.getItem('user');
    let company = localStorage.getItem('company');
    let {candidate, contract} = useParams();
    let {state} = useLocation();
    let draftData = "" //in case of direct approach to url

    //update the PDF contract content
    const editSubmit = async() => {
        setErrorMessage("Submitting ...")
        let draftContent = await childRef.current.convertContentToHTML();
        const editStatus = await fetch(`${serverURL}/editcontract/`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({creator, candidate, company, contract, draftContent})
              }).then((data)=> data.json())
        if(editStatus.success){
            history.goBack();
        }else{
            setErrorMessage(editStatus.msg)
        }      
    }

    // reorder or delete pages from the contract
    const reorderDeleteSubmit = async (id) =>{
        setErrorMessage(null);
        //starting page number, ending page number
        let SP, EP;
        //id=0: DELETION
        //ID=1: REORDER
        if(id===0){
            SP = document.getElementById("deleteSP").value;
            EP = document.getElementById("deleteEP").value;
        }else{
            SP = await document.getElementById("reorderSP").value;
            EP = await document.getElementById("reorderEP").value;
        }
        let editStatus = await fetch(`${serverURL}/editcontract/reorderDelete`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({candidate,contract, SP, EP, id})
              }).then((data)=> data.json())
        if(editStatus.success){
            history.goBack();
        }else{
            setErrorMessage(editStatus.msg)
        }      
    }

    // BACK TO DASHBOARD
    const cancelHandler = () => {
        setErrorMessage(null);
        history.goBack();
    }

    return (
        <div>
        <br/>
        { errorMessage && <h4 className="error"> { errorMessage } </h4> }
        <br/>
        <Button class="btn btn-danger" text="Back to Dashboard" onClick={cancelHandler} />
        <br/>
        <br/>
        <div className="edit-contract form-control">
        <TextEditor initialText={state === undefined ? draftData :state.data} ref={childRef}/>
            <div className="button-grp">
                <Button class="btn btn-success" text="Save Changes" onClick={editSubmit} />
                <Button class="btn btn-danger" text="Cancel" onClick={cancelHandler} />
            </div>
        </div>
            <div className="edit-contract-form">
                <div className='form-control'>
                    <h4>Delete Pages</h4>
                    <input
                        type='number'
                        id='deleteSP'
                        min={1}
                        max={10}
                    />
                    <label>Enter starting page</label>
                    <br/>
                    <input
                        type='number'
                        id='deleteEP'
                        min={1}
                        max={10}
                    />
                    <label>Enter ending page</label>
                    <br/>
                    <div className="button-grp">
                    <Button class="btn btn-success" text="Delete Pages" onClick={()=>reorderDeleteSubmit(0)} />
                    <Button class="btn btn-danger" text="Cancel" onClick={cancelHandler} />
                </div>
                </div>
                
                <div>
                <div className='form-control'>
                    <h4>Reorder Pages</h4>
                    <input
                        type='number'
                        id='reorderSP'
                        min={1}
                        max={10}
                    />
                    <label>Enter starting page</label>
                    <br/>
                    <input
                        type='number'
                        id='reorderEP'
                        min={1}
                        max={10}
                    />
                    <label>Enter ending page</label>
                    <br/>
                    <div className="button-grp"> 
                    <Button class="btn btn-success" text="Reorder Pages" onClick={()=>reorderDeleteSubmit(1)} />
                    <Button class="btn btn-danger" text="Cancel" onClick={cancelHandler} />  
                </div>
                </div>
                </div>
            </div>    
        </div>
    )
}

export default EditContract
