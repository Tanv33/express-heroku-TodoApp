import React, { useState } from "react";
function Rough() {
  // useState Hooks
  const [inputText, setInputText] = useState("");
  const [arr, setArr] = useState([]);

  // Submit button function
  const submit = (e) => {
    e.preventDefault();
    if (inputText !== "") {
      setArr([inputText, ...arr]);
      setInputText("");
    }
  };

  // Getting value of input onchange and saving it to inputText useState Hook
  const inputOnChange = (e) => {
    setInputText(e.target.value);
  };

  // delete button or Deleting a specific Li
  const deleteLi = (c) => {
    arr.splice(c.target.parentElement.id, 1);
    setArr([...arr]);
  };

  // deleteAll button for Deleting all Li
  const deleteAll = () => {
    setArr([]);
  };

  //Edit button for editing text
  const edit = (e) => {
    e.target.disabled = true;
    let targetText = e.target.parentElement.firstElementChild.innerText;
    e.target.parentElement.firstElementChild.innerHTML = `<input type="text" value="${targetText}" />`;
    e.target.parentElement.firstElementChild.firstElementChild.addEventListener(
      "blur",
      (c) => {
        arr.splice(
          c.target.parentElement.parentElement.id,
          1,
          c.target.parentElement.firstElementChild.value
        );
        c.target.parentElement.innerText = c.target.value;
        setArr([...arr]);
        e.target.disabled = false;
      }
    );
  };

  return (
    <div>
      <form style={{ textAlign: "center" }} onSubmit={submit}>
        <h1>Todo List</h1>
        <input
          type="text"
          value={inputText}
          tabIndex="1"
          onChange={inputOnChange}
        />
        <button>Submit</button>
        <button onClick={deleteAll}>Delete All</button>
      </form>
      <div>
        {arr.map((element, index) => {
          return (
            <div style={{ display: "flex" }} key={index} id={index}>
              <li>{element} </li>
              <button onClick={edit}>Edit</button>
              <button onClick={deleteLi}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rough;
