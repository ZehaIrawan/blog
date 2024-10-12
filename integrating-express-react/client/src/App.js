import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:5000/api/todos");
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" });
    setSelectedTodo(null);
    fetchTodos();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: "auto",
        padding: "2rem",
        gap: "2rem",
      }}
    >
      <div style={{ width: "40%" }}>
        <h1>Todo List</h1>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id}
              style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}
            >
              <strong>{todo.title}</strong>
              <p>{todo.description}</p>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <TodoForm setTodos={setTodos} todos={todos} selectedTodo={selectedTodo} />
    </div>
  );
}

export default App;
