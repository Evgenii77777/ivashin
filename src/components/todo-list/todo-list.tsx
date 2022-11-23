import classNames from "classnames";
import { Dispatch, SetStateAction } from "react";
import { Todo } from "../todo/todo";
import "./todo-list.scss";

type TodoProps = {
  id: string;
  text: string;
  completed: boolean;
  tegs: string[];
  isFind: boolean;
}[];

type TodolistProps = {
  onDeleteTodo: (id: string) => void;
  onToggleCompleted: (todoId: string) => void;
  todos: TodoProps;
  setTodos: Dispatch<
    SetStateAction<
      {
        id: string;
        text: string;
        completed: boolean;
        tegs: string[];
        isFind: boolean;
      }[]
    >
  >;
};

export const TodoList = ({
  onToggleCompleted,
  onDeleteTodo,
  todos,
  setTodos,
}: TodolistProps) => {
  return (
    <ul className="TodoList">
      {todos.map(({ id, completed, text, tegs, isFind }) => (
        <li
          key={id}
          className={classNames("TodoList__item", {
            "TodoList__item--completed": completed,
          })}
        >
          <Todo
            text={text}
            completed={completed}
            id={id}
            tegs={tegs}
            isFind={isFind}
            onToggleCompleted={() => onToggleCompleted(id)}
            onDelete={() => onDeleteTodo(id)}
            setTodos={setTodos}
          />
        </li>
      ))}
    </ul>
  );
};
