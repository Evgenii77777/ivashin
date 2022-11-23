import { useState, useEffect, useCallback } from "react";
import shortid from "shortid";
import { Container } from "./components/container";
import { TodoEditor } from "./components/todo-editor";
import { TodoList } from "./components/todo-list";
import { TodoFilter } from "./components/todo-filter";
import todosOld from "./todos.json";

import "./App.css";

export const App = () => {
  const [todos, setTodos] = useState(todosOld);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeEdit = (e: React.SyntheticEvent<EventTarget>): void => {
    let target = e.currentTarget as HTMLInputElement;
    setMessage(target.value);
  };

  const handleSubmitEdit = (e: React.SyntheticEvent<EventTarget>): void => {
    e.preventDefault();
    addTodo(message);
    setMessage("");
  };

  const onDeleteTodo = (id: string) => {
    setTodos(
      todos.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const addTodo = (text: string) => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
      tegs: [],
      isFind: false,
    };
    setTodos([...todos, todo]);
  };

  const toggleCompleted = (todoId: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const changeFilter = (e: any) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleTodos = useCallback(() => {
    const normalizedFilter = filter.toLowerCase();
    if (filter !== "") {
      setTodos(
        todos.filter(({ tegs }) => tegs.join(",").includes(normalizedFilter))
      );
    } else {
      setTodos(todosOld);
    }
  }, [filter]);

  useEffect(() => {
    getVisibleTodos();
  }, [getVisibleTodos]);

  return (
    <div className="App">
      <Container>
        <TodoList
          onDeleteTodo={onDeleteTodo}
          onToggleCompleted={toggleCompleted}
          todos={todos}
          setTodos={setTodos}
        />
        <TodoEditor
          handleChange={handleChangeEdit}
          handleSubmit={handleSubmitEdit}
          message={message}
        />
        <TodoFilter filter={filter} onChange={changeFilter} />
      </Container>
    </div>
  );
};
