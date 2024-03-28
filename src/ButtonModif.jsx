import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { FaDeleteLeft } from "react-icons/fa6";

function ButtonModif({ ToDo, setToDo, index }) {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(ToDo[index].text);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const confirmModif = () => {
        const updatedToDo = [...ToDo];
        updatedToDo[index].text = inputValue;
        setToDo(updatedToDo);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div>
                <input type="text" value={inputValue} onChange={handleInputChange} />
                <button className="modifBtn" onClick={confirmModif}><GiConfirmed />
                </button>
            </div>
        );
    }

    return (
        <button className="modifBtn" onClick={() => setIsEditing(true)}><FaEdit /></button>
    );
}

export default ButtonModif;
