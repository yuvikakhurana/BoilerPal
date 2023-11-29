import React from "react";
import axios from "axios";
import { ListContainer, Row, Text, DeleteIcon, EditIcon } from "./styles";

function TodoList({ todos, fetchData }) {
  const updateTodo = async (text, completed) => {
    try {
      const response = await axios.put(`/todos/${text}`, {
        text, completed
      });
      fetchData();
      return response.data.json;
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async (text) => {
    try {
      const response = await axios.delete(`/todos/${text}`, {
        text,
      });
      fetchData();
      return response.data.json;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <ListContainer>
        {todos?.map((todo) => (
          <Row key={todo._id}>
            <Text
              onClick={() => updateTodo(todo.text, !todo.completed)}
              isCompleted={todo.completed}
            >
              {todo.text}
            </Text>
            <DeleteIcon
              data-testid="close"
              onClick={() => deleteTodo(todo.text)}
            >
              X
            </DeleteIcon>
            <EditIcon onClick={() => handleEditClick(todo)}>Edit</EditIcon> 
          </Row>
        ))}
      </ListContainer>
    </div>
  );
}

export default TodoList;
