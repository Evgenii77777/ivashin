import { ChangeEventHandler, FormEventHandler } from "react";
import "./todo-editor.scss";

type EditrProps = {
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleChange: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  message: string;
};

export const TodoEditor = ({
  handleSubmit,
  handleChange,
  message,
}: EditrProps) => (
  <form className="TodoEditor" onSubmit={handleSubmit}>
    <textarea
      className="TodoEditor__textarea"
      value={message}
      onChange={handleChange}
    ></textarea>
    <button type="submit" className="TodoEditor__button">
      Сохранить
    </button>
  </form>
);
