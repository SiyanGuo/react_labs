import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [todoEditingId, setTodoEditingId] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  //useEffect to get todos from local storage
  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  //useEffect to save todos in local storage
  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  // Add the handlesubmit code here
  function handleSubmit(event) {
    event.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false
    };

    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
      setTodo("");
    } else {
      alert("Enter Valid Task");
      setTodo("");
    }
  }

  // Add the deleteToDo code here
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    })
    setTodos(updatedTodos);
  }

  // Add the submitEdits code here
  function submitEdits(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditingId(null);
  }



  return (
    <div id="todo-list" className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          align="right"
          placeholder="Add a new task"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo) =>
        <div className="todo" key={todo.id}>
          <div className="todo-text">
            <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />

            {todo.id === todoEditingId ? (
              <input type="text" onChange={(event) => setEditingText(event.target.value)} />
            ) : (
              <div> {todo.text}</div>
            )}
          </div>
          <div className="todo-action">
            {todo.id === todoEditingId ? (
              <button onClick={() => submitEdits(todo.id)}> Submit Edits </button>
            ) : (
              <button onClick={() => setTodoEditingId(todo.id)}> Edit </button>
            )}

            <button onClick={() => deleteTodo(todo.id)}> Delete </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
