import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../Form";
import TodoList from "../TodoList";
import { Container } from "./styles";

function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (input.length === 0) return null;
    console.log({
      ...todos,
      text: input,
      completed: false,
    });
    await axios.post("/todos", [
      {
        ...todos,
        text: input,
        completed: false,
      },
    ]);
    fetchData();
    setInput("");
  };

  return (
    <Container>
      <h2 style={{color: "#1cbcd4"}}>Your Todos</h2>
      <Form input={input} setInput={setInput} addTodo={addTodo} />
      <TodoList todos={todos} fetchData={fetchData} />
    </Container>
  );
}

export default Todo;