import React from 'react';
import {FaDeleteLeft} from "react-icons/fa6";

function ButtonRemoveInput({ToDo, setToDo, index}) {
    const removeInput = () => {
        const updatedInputs = ToDo.filter((CurrToDo, i) => i !== index);
        setToDo(updatedInputs);
    }
    return (
        <button className="removeBtn" onClick={removeInput}><FaDeleteLeft />
        </button>
    );
}

export default ButtonRemoveInput;