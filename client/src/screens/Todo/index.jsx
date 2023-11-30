import React, { useEffect, useState } from "react";
import Form from "../Form";
import TodoList from "../TodoList";
import { Container } from "./styles";
import {useCreateTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosMutation
} from "../../slices/usersApiSlice.js";

function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [getTodos] = useGetTodosMutation();
  const [createTodo] = useCreateTodoMutation();


  const fetchData = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
      fetchData();
    }, [todos]);

  const addTodo = async (e) => {
    e.preventDefault();
    if (input.length === 0) return null;
    console.log({
      text: input,
      completed: false,
    });
    await createTodo({
      text: input,
      completed: false,
    })
    fetchData();
    setInput("");
  };

  return (
    <Container>
      <h2 style={{color: "#1cbcd4"}}>Your Todos</h2>
      <Form input={input} setInput={setInput} addTodo={addTodo} />
      <TodoList todos={todos} fetchData={fetchData} setTodos={setTodos} />
    </Container>
  );
}

export default Todo;
