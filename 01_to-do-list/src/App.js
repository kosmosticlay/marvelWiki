import { useState } from "react";
import "./App.css";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const onChangeInput = (event) => {
    setToDo(event.target.value);
  };

  const addToDo = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDoList((currentList) => [toDo, ...currentList]);
    setToDo("");
  };

  const onToggleToDo = (event) => {
    event.target.classList.toggle("checked");
  };

  const removeToDo = (event) => {
    event.preventDefault();
    setToDoList([]);
  };

  return (
    <div className="App">
      <h1 className="title">#1 To Do List</h1>
      <form className="todoForm">
        <label htmlFor="todoInput">
          <span className="highlight">할 일</span>을 입력하세요
        </label>
        <div>
          <input value={toDo} onChange={onChangeInput} id="todoInput" />
          <button onClick={addToDo} className="submitBtn">
            추가하기
          </button>
        </div>
      </form>
      <div className="todoContainer">
        <h2>📑할 일 목록({toDoList.length === 0 ? null : toDoList.length})</h2>
        <ul className="todoList">
          {toDoList.map((item, index) => (
            <li onClick={onToggleToDo} className="todoItem" key={index}>
              {item}
            </li>
          ))}
        </ul>
        <div>
          <button onClick={removeToDo} className="deleteBtn">
            목록 삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
