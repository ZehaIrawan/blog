import React, { useState, useEffect } from "react";

const TodoForm = ({ setTodos, selectedTodo, todos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [selectedTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedTodo) {
      const response = await fetch(
        `http://localhost:5000/api/todos/${selectedTodo._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ title, description }),
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      setTodos((prev) =>
        prev.map((todo) => (todo._id === selectedTodo._id ? data : todo)),
      );
      alert("Todo updated successfully");
    } else {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setTodos((prev) => [...prev, data]);

      setTitle("");
      setDescription("");
      alert("Todo created successfully");
    }
  };

  return (
    <div>
      <h2>{selectedTodo ? "Update" : "Add"} Todo</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <input
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{selectedTodo ? "Update" : "Add"} Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;
