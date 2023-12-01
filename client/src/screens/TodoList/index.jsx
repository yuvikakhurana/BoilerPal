import React from "react";
import { ListContainer, Row, Text, DeleteIcon } from "./styles";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosMutation,
} from "../../slices/usersApiSlice.js";
import { useState } from "react";

function TodoList({ todos, fetchData, setTodos }) {
  const [editTodo] = useEditTodoMutation();
  const [delTodo] = useDeleteTodoMutation();
  const [editing, setEditing] = useState(null);
  const [newText, setNewText] = useState("");

  const handleEdit = (text) => {
    if (editing === text) {
      setEditing(null);
      setNewText("");
      return;
    }
    setEditing(text);
    setNewText(text);
  };

  const updateTextTodo = async (oldText, newText) => {
    try {
      let todo_new = {
        text: oldText,
        new_text: newText,
      };
      const response = await editTodo(todo_new);
      setTodos(todos.map((todo) => (todo.text === oldText ? { ...todo, text: newText } : todo)));
      setEditing(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTodo = async (text, completed) => {
    try {
      let todo_new = {
        text: text,
        completed: !completed,
      };
      console.log(todo_new);
      const response = await editTodo(todo_new);
      setTodos(todos.map((todo) => (todo.text === text ? todo_new : todo)));
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (text) => {
    try {
      const response = await delTodo({ text: text });
      setTodos(todos.filter((todo) => todo.text !== text));
      console.log(todos);
      return response.data.json;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <ListContainer>
        {todos?.map((todo) => (
          <Row key={todo.text} >
            {editing === todo.text ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                onBlur={() => updateTextTodo(todo.text, newText, todo.completed)}
              />
            ) : (
              <Text
                onClick={() => updateTodo(todo.text, todo.completed)}
                isCompleted={todo.completed}
              >
                {todo.text}
              </Text>
            )}
            <img src="edit.png" onClick={() => handleEdit(todo.text)} width="15px"/>
            <DeleteIcon
              data-testid="delete"
              onClick={() => deleteTodo(todo.text)}
            >
              X
            </DeleteIcon>
          </Row>
        ))}
      </ListContainer>
    </div>
  );
}

export default TodoList;
