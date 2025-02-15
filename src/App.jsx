import { useReducer, useState } from "react";
import "./App.css";

function App() {

  //reducer function to handle actions
  function TodoReducer(state, { type, payload }) {
    switch (type) {
      //adding a new item to the list
      case "add":
        return [
          {
            id: Date.now(),   //using predefined Date function to create an unique id
            item: payload,    //to do item
            isComplete: false,  //boolean variable to check if complete
            isEditing: false,   //boolean variable to check if item is in edit mode
          },
          ...state,
        ];
      //action for save button for items in edit mode
      case "save":
        return state.map((todo) =>
          todo.id === payload.id    
            ? { ...todo, item: payload.newItem, isEditing: false }
            : todo
        );
      //action for delete button to delete an item
      case "delete":
        return state.filter((item) => item.id !== payload.id);
      //toggle action for checkbox
      case "toggle":
        return state.map((todo) =>
          todo.id === payload.id
            ? { ...todo, isComplete: !todo.isComplete }
            : todo
        );
      //action for item to be put in edit mode
      case "setEdit":
        return state.map((todo) =>
          todo.id === payload.id
            ? { ...todo, isEditing: true }
            : { ...todo, isEditing: false }
        );
      //action for cancel button  
      case "cancelEdit":
        return state.map((todo) =>
          todo.id === payload.id ? { ...todo, isEditing: false } : todo
        );
      default:
        throw Error("Unknown Action: " + type);
    }
  }

  const [todo, dispatchTodo] = useReducer(TodoReducer, []); //useReducer for different actions
  const [form, setForm] = useState("");     //useState to handle form input
  const [editText, setEditText] = useState(""); //useState to handle edit mode

  
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
  }

  function handleEdit(id, currentValue) {
    setEditText(currentValue);
    dispatchTodo({ type: "setEdit", payload: { id } });
  }

  function handleSave(id) {
    dispatchTodo({ type: "save", payload: { id, newItem: editText } });
  }

  function handleCancel(id) {
    dispatchTodo({ type: "cancelEdit", payload: { id } });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (form.newItem === "") return;
    dispatchTodo({ type: "add", payload: form.newItem });
    event.target.elements.newItem.value = "";
    setForm({ ...form, newItem: "" });
  }

  return (
    <>
      <h1>To-do List</h1>
      <form className="mainContainer" onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} name="newItem" placeholder="Add your item" />
        <button type="submit" className="addBtn">Add</button>
      </form>

      <ul>
        {todo.map((item) => (
          <div key={item.id} className="listItem">
            <input
              type="checkbox"
              className="check"
              checked={item.isComplete}
              onChange={() =>
                dispatchTodo({ type: "toggle", payload: { id: item.id } })
              }
            />
            {item.isEditing ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button onClick={() => handleSave(item.id)}>Save</button>
                <button onClick={() => handleCancel(item.id)}>Cancel</button>
              </>
            ) : (
              <>
                <li>{item.item}</li>
                <button className="edit" onClick={() => handleEdit(item.id, item.item)}>
                  Edit
                </button>
                <button
                  className="delete"
                  disabled={!item.isComplete}
                  onClick={() =>
                    dispatchTodo({ type: "delete", payload: item })
                  }
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;
