import Contract from "./Contract";
import React,{useState, useEffect} from "react";

const ContractRow = ({contracts, onDelete}) => {
    const [newContracts, setNewContracts] = useState(contracts);
    
    useEffect(() => {
        setNewContracts(contracts)
    }, [contracts]);

    return( 
        <React.Fragment >
        { newContracts.map((contract, idx) => (
                <Contract content={contract} key={idx} id={idx} onDelete={onDelete} />
            ))
        }
        </React.Fragment>   
    )
}

export default ContractRow