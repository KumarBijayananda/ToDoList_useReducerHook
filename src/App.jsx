import { useReducer, useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [todo, dispatchTodo] = useReducer(TodoReducer, []);

  // console.log("todo ", todo)

  function TodoReducer(state, { type, payload }) {
    console.log("state ", state);
    switch (type) {
      case "add": {
        // console.log(state.id);
        return [...state, { id: Date.now(), item: payload, isComplete: false }];
      }
      case "edit": {
        return;
      }

      case "delete": {
        const remItems = state.filter((item) => {
          if(payload !== item.id) return item;
        });
        console.log(remItems)
        return [...remItems];
      }
      case "save": {
        return;
      }
      default: {
        throw Error("Unknown Action: " + type);
      }
    }
  }

  function handleChange(event) {
    setForm(event.target.value);
    // event.target.value = "";
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatchTodo({ type: "add", payload: form });
    setForm("");
  }

  function handleEdit() {}
  return (
    <>
      <h1>To Do List</h1>
      <form className="mainContainer" onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          onChange={handleChange}
          name="name"
          placeholder="Add your item"
        />
        <button input="submit">Add</button>

        <ul>
          {todo.map((item, index) => (
            <div key={index}>
              <input type="checkbox" className="check" name="checkbox" />
              <li>{item.item}</li>
              <button className="edit">Edit</button>
              <button
                className="delete"
                onClick={() =>
                  dispatchTodo({ type: "delete", payload: item.id })
                }
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </form>
    </>
  );
}

export default App;
