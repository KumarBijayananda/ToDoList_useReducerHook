import { useReducer, useState } from "react";
import "./App.css";

function App() {
  function TodoReducer(state, { type, payload }) {
    switch (type) {
      case "add":
        return [
          {
            id: Date.now(),
            item: payload,
            isComplete: false,
            isEditing: false,
          },
          ...state,
        ];
      case "save":
        return state.map((todo) =>
          todo.id === payload.id
            ? { ...todo, item: payload.newItem, isEditing: false }
            : todo
        );
      case "delete":
        return state.filter((item) => item.id !== payload.id);
      case "toggle":
        return state.map((todo) =>
          todo.id === payload.id
            ? { ...todo, isComplete: !todo.isComplete }
            : todo
        );
      case "setEdit":
        return state.map((todo) =>
          todo.id === payload.id
            ? { ...todo, isEditing: true }
            : { ...todo, isEditing: false }
        );
      case "cancelEdit":
        return state.map((todo) =>
          todo.id === payload.id ? { ...todo, isEditing: false } : todo
        );
      default:
        throw Error("Unknown Action: " + type);
    }
  }

  const [todo, dispatchTodo] = useReducer(TodoReducer, []);
  const [form, setForm] = useState("");
  const [editText, setEditText] = useState("");

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
        <button type="submit">Add</button>
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
