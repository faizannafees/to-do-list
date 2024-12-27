import { Button } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { Link } from "react-router-dom";

const ToDoList = () => {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);

    const [allTodos, setAllTodos] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [completedTodos, setCompletedTodos] = useState([]);

    const handleAddToDo = () => {
        let newTodo = {
            task: newTask,
        };
        const updatedTodo = [...allTodos];
        updatedTodo.push(newTodo);
        setAllTodos(updatedTodo);
        localStorage.setItem("todolist", JSON.stringify(updatedTodo));
    };

    const handleDeleteTodo = (index) => {
        const reducedTodo = [...allTodos];
        reducedTodo.splice(index, 1);

        localStorage.setItem("todolist", JSON.stringify(reducedTodo));

        setAllTodos(reducedTodo);
    };

    const handleComplete = (index) => {
        let filteredItem = {
            ...allTodos[index],
        };

        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push(filteredItem);
        setCompletedTodos(updatedCompletedArr);
        handleDeleteTodo(index);
        localStorage.setItem("completedTodo", JSON.stringify(updatedCompletedArr));
    };

    const handleDeleteCompletedTodo = (index) => {
        const reducedTodo = [...completedTodos];
        reducedTodo.splice(index, 1);

        localStorage.setItem("completedTodo", JSON.stringify(reducedTodo));
        setCompletedTodos(reducedTodo);
    };

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("todolist")) || [];
        const completedTodo =
            JSON.parse(localStorage.getItem("completedTodo")) || [];
        setAllTodos(storedTasks);
        setCompletedTodos(completedTodo);
    }, []);

    return (
        <div className="todo-list-app">
            <div className="header">To-Do List</div>
            <div className="route-div">
                <Link to={"/users"}><Button className="route-btn">Go to User Table</Button></Link>
            </div>
            <div className="todo-app">
                <div className="task-input">
                    <label>
                        <input
                            placeholder="Write a task here"
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                    </label>
                    <button type="button" className="add-btn" onClick={handleAddToDo}>
                        Add +
                    </button>
                </div>

                <div>
                    <button
                        className={`toggle-btn isCompleteScreen ${isCompleteScreen === false && "active"
                            }`}
                        onClick={() => setIsCompleteScreen(false)}
                    >
                        To Do
                    </button>
                    <button
                        className={`toggle-btn isCompleteScreen ${isCompleteScreen === true && "active"
                            }`}
                        onClick={() => setIsCompleteScreen(true)}
                    >
                        Completed
                    </button>
                </div>

                {isCompleteScreen
                    ? completedTodos.map((item, index) => (
                        <div className="todo-list" key={index}>
                            <div className="todo-list-item">
                                <h3>{item.task}</h3>
                                <div>
                                    <AiOutlineDelete
                                        className="dlt-icon icon"
                                        onClick={() => handleDeleteCompletedTodo(index)}
                                        title="Delete?"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                    : allTodos.map((item, index) => (
                        <div className="todo-list" key={index}>
                            <div className="todo-list-item">
                                <h3>{item.task}</h3>
                                <div>
                                    <AiOutlineDelete
                                        className="dlt-icon icon"
                                        onClick={() => handleDeleteTodo(index)}
                                        title="Delete?"
                                    />
                                    <BsCheckLg
                                        className="check-icon icon"
                                        title="Complete?"
                                        onClick={() => handleComplete(index)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ToDoList;
