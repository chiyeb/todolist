import React, {useEffect, useState} from 'react';
import ParentComponent  from "./ToDo.jsx";
import ButtonAddInput from "./ButtonAddInput.jsx";

function App(props) {
    const [ToDo, setToDo] = useState(() => {
        const savedTasks = localStorage.getItem('ToDo');
        if (savedTasks) {
            return JSON.parse(savedTasks);
        } else {
            return [];
        }
    });
    useEffect(() => {
        localStorage.setItem('ToDo', JSON.stringify(ToDo));
    }, [ToDo]);
    let nbToDoNotChecked = 0;
    ToDo.map((item, index) => {
        if (!(item.isChecked)){
            nbToDoNotChecked++;
            console.log(item.isChecked);
        }
    });

    return (
        <div className="mainDiv">
            <h1>Reste a faire : {nbToDoNotChecked}</h1>
            <div className="divAddBtnInput">
                <ButtonAddInput ToDo={ToDo} setToDo={setToDo}/>
            </div>
            <div className="toDoContainerAll">
                <ParentComponent ToDo={ToDo} setToDo={setToDo}/>
            </div>
        </div>
    );
}

export default App;