import React, { useState } from 'react';
import { FaCalendarPlus, FaCalendarTimes } from "react-icons/fa"; // Correction de l'importation
import { IoMdAddCircleOutline } from "react-icons/io";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ButtonAddInput({ setToDo }) {
    const [inputValue, setInputValue] = useState('');
    const [valueDate, setValueDate] = useState(new Date());
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const onChangeDate = (nextValue) => {
        setValueDate(nextValue);
        console.log(nextValue);
    };

    const addToDo = () => {
        const newToDo = {
            text: inputValue,
            isChecked: false,
            date: (isCalendarVisible ? valueDate : null),
        };
        if (newToDo.text === '') return;
        setToDo(ToDo => [...ToDo, newToDo]);
        setInputValue('');
    };

    const showCalendar = () => {
        console.log("Avant:", isCalendarVisible); // Ajoutez pour le debug
        setIsCalendarVisible(!isCalendarVisible);
        console.log("Après:", isCalendarVisible); // Ajoutez pour le debug
    };

    return (
        <div className="addInputDiv">
            <input
                className="addInput"
                type="text"
                placeholder="Tapez quelque chose..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="calendarBtn" onClick={showCalendar}>
                {isCalendarVisible ? <FaCalendarTimes />
                    : <FaCalendarPlus />}
            </button>
            {isCalendarVisible && (
                <Calendar className="calendar" onChange={onChangeDate} value={valueDate}/>
            )}
            <button className="addInputBtn" onClick={addToDo}><IoMdAddCircleOutline />
            </button>
        </div>
    );
}

export default ButtonAddInput;
