import Button from "../Elements/Button";
import {useEffect, useState} from "react";
import ContractRow from "../Contracts/ContractRow";
import CreateDraft from "./CreateDraft";
import {serverURL} from "../../config";

// Fetch Tasks
const fetchContracts = async (user, company, candidate) => {
    return await fetch(`${serverURL}/contracts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, company, candidate})
      }).then((data)=> data.json())
}

const Dashboard = () => {
    const [contracts, setContracts] = useState([])
    const [showCreateDraft, toggleShowCreateDraft] = useState(false);
    const [rendered, setRendered] = useState(false);

    let user, company;
    user = localStorage.getItem('user')
    company = localStorage.getItem('company')

    useEffect(() => {
        const getTasks = async () => {
            let contractsFromServer = await fetchContracts(localStorage.getItem('user'), localStorage.getItem('company'), localStorage.getItem('candidate'))
            setContracts(contractsFromServer)
          }
        if(rendered){ 
            getTasks()
        }
        if( ! rendered ) {  
            setRendered(true);
        }
    },[rendered]);
       
    const handleCreateDraft = () => {
        toggleShowCreateDraft(true)
    }

    //newContracts is an array of contract objects
    const addContract = (newContracts) => {
        console.log("contracts:", contracts)
        console.log("new contracts: ", newContracts)
        if(contracts !== null) setContracts([...newContracts, ...contracts])
        else setContracts([...newContracts])
    }
    
    const deleteContract = (id) => {
        console.log("id deletion called on", id);
        setContracts(contracts.filter((contract) => contract._id !== id))
    }

    return(
        <div>
           {(localStorage.getItem('candidate')==="false") && <div>
                <Button class="btn btn-primary btn-lg btn-block initiateDraftButton" text="Initiate New Draft" color="green" onClick={handleCreateDraft} /> 
              {
              showCreateDraft && <CreateDraft addContract={addContract} toggle={toggleShowCreateDraft} user={user} company={company} />
              }
            </div>
           } 
            <hr/>
            <div className="contracts-table">
                <table className="table table-striped">
                <thead className="thead-light">
                <tr>
                    <th>Name <br/>(Click to View)</th>
                    <th>Company</th>
                    <th>Associated Candidate</th>
                    <th>Status</th>
                    <th>Actions Available</th>
                </tr>
                </thead>
                <tbody>
                {contracts.length > 0 ? (
                    <ContractRow
                    contracts={contracts}
                    onDelete={deleteContract}
                    />
                ) : (
                    'You have not created any contracts yet.'
              )}
                </tbody>
                </table>
            </div>
        </div>
    )
    
}

export default Dashboard;