import React, { useState } from 'react';
import ButtonAddInput from "./ButtonAddInput.jsx";
import ButtonRemoveInput from "./ButtonRemoveInput.jsx";
import ButtonModif from "./ButtonModif.jsx";
import { MdDone } from "react-icons/md";
import Calendar from "react-calendar";
import { FaCalendarPlus, FaCalendarTimes } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";



function ToDoItem({ text, date, isChecked,onChangeDone ,onChange, onShowCalendar, calendarVisible }) {
    let formattedDate = "";
    if (date) {
        formattedDate = new Date(date).toLocaleDateString('fr-FR');
    }
    return (
        <div className="ToDocontainer">
            {check(isChecked, text)}
            <p className="ToDoDate">{date}</p>
            <button className="doneBtn" onClick={onChangeDone}> {isChecked? <RxCross1/> : <MdDone/>} </button>
            <button className="calendarBtn" onClick={onShowCalendar}>
                {calendarVisible ? <FaCalendarTimes /> : <FaCalendarPlus />}
            </button>
            {calendarVisible && (
                <Calendar
                    className="calendar"
                    onChange={onChange}
                    value={new Date(date)}
                />
            )}
        </div>
    );
}

function check(isChecked, text) {
    if (isChecked) {
        return <p className="ToDoTextChecked">{text}</p>;
    }
    return <p className="ToDoTextUnchecked">{text}</p>;
}

function ParentComponent({ ToDo, setToDo }) {
    const onChangeDate = (nextValue, index) => {
        const updatedToDo = ToDo.map((item, i) =>
            i === index ? { ...item, date: nextValue } : item
        );
        setToDo(updatedToDo);
    };

    const showCalendar = (index) => () => {
        const updatedToDo = ToDo.map((item, i) =>
            i === index ? { ...item, isCalendarVisible: !item.isCalendarVisible } : item
        );

        setToDo(updatedToDo);
    };
    const onChangeDone = (index) => {
        const updatedToDo = [...ToDo];
        updatedToDo[index].isChecked = !updatedToDo[index].isChecked
        setToDo(updatedToDo);
    };
    const timeLeft = (index) => {
        const today = new Date();
        const date = new Date(ToDo[index].date);
        const timeLeft = date - today;
        const daysLeft = Math.abs(Math.ceil(timeLeft / (1000 * 60 * 60 * 24)));
        if (!ToDo[index].date) return ("");
        if (ToDo[index].isChecked) return ("");
        if (new Date(ToDo[index].date) < today) return(<p className="timeLeft">{daysLeft} jours en retard !</p>);


        return <p className="timeLeft">{daysLeft} jours avant la date butoir</p>;
    }
    {ToDo.map((item, index) => (
        console.log(item.date)
    ))}
    return (
        <div className="divParentComponent">
            {ToDo.map((item, index) => (
                <div className="divParentComponentAlone" key={index}>
                    <ToDoItem
                        text={item.text}
                        date={item.date ? item.date.toString().substring(0, 15) : ""}
                        isChecked={item.isChecked}
                        onChangeDone={() => onChangeDone(index)}
                        onChange={(value) => onChangeDate(value, index)}
                        onShowCalendar={showCalendar(index)}
                        calendarVisible={item.isCalendarVisible}
                    />
                    <ButtonModif ToDo={ToDo} setToDo={setToDo} index={index} />
                    <ButtonRemoveInput ToDo={ToDo} setToDo={setToDo} index={index} />
                    {timeLeft(index)}
                </div>
            ))}
        </div>
    );
}

export default ParentComponent;
