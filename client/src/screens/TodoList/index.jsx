import React from "react";
import { ListContainer, Row, Text, DeleteIcon } from "./styles";
import {useCreateTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosMutation
} from "../../slices/usersApiSlice.js";

function TodoList({ todos, fetchData, setTodos }) {
  const [editTodo] = useEditTodoMutation();
  const [delTodo] = useDeleteTodoMutation();

  const updateTodo = async (text, completed) => {
    try {
      let todo_new = {
        text: text,
        completed: !completed,
      };
      console.log(todo_new);
      const response = await editTodo({ text: text, completed: !completed });
      console.log(todos);
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
          <Row key={todo.text}>
            <Text
              onClick={() => updateTodo(todo.text, todo.completed)}
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
          </Row>
        ))}
      </ListContainer>
    </div>
  );
}

export default TodoList;
