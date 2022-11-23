import React, { Dispatch, SetStateAction, useState } from "react";

type TodoProps = {
  text: string;
  id: string;
  completed: boolean;
  tegs?: string[] | [];
  isFind?: boolean;
  onToggleCompleted: () => void;
  onDelete: () => void;
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

export const Todo = ({
  text,
  completed,
  tegs,
  onToggleCompleted,
  onDelete,
  id,
  setTodos,
}: TodoProps) => {
  const [updatedItem, setUpdatedItem] = useState("");
  const isCurrentBeingUpdated = updatedItem === id;

  const handleInputChange = (e: any) => {
    if (e.target.value.includes("#")) {
      let teg = e.target.value
        .split(" ")
        .filter((str: string) => str.includes("#"));
      setTodos((prevList: any) =>
        prevList.map((todo: any) =>
          todo.id === id ? { ...todo, tegs: [teg] } : todo
        )
      );
    } else {
      setTodos((prevList: any) =>
        prevList.map((todo: any) =>
          todo.id === id ? { ...todo, tegs: [] } : todo
        )
      );
    }

    setTodos((prevList: any) =>
      prevList.map((todo: any) =>
        todo.id === id ? { ...todo, text: e.target.value } : todo
      )
    );
  };

  const renderTitleOrInput = () => {
    return isCurrentBeingUpdated ? (
      <input value={text} onChange={handleInputChange} />
    ) : (
      <p className="TodoList__text">{text}</p>
    );
  };

  return (
    <React.Fragment>
      <input
        type="checkbox"
        className="TodoList__tegs"
        checked={completed}
        onChange={onToggleCompleted}
        id={id}
      />
      <div className="TodoList__wrapper">
        {renderTitleOrInput()}
        {tegs && (
          <ul className="TegsList">
            {tegs.map((item) => (
              <li key={item} className="TegsItem">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="TodoList__container">
        <button
          type="button"
          className="TodoList__btn"
          onClick={() => setUpdatedItem(isCurrentBeingUpdated ? "" : id)}
        >
          {isCurrentBeingUpdated ? "Сохранить" : "Редактировать"}
        </button>
        <button type="button" className="TodoList__btn" onClick={onDelete}>
          Удалить
        </button>
      </div>
    </React.Fragment>
  );
};
