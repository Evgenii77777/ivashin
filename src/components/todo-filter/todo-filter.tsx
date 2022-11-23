import { ChangeEventHandler } from "react";
import "./todo-filter.scss";

type FilterProps = {
  filter: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
};

export const TodoFilter = ({ onChange, filter }: FilterProps) => (
  <div className="TodoFilter">
    <p className="TodoFilter__label">Фильтр по тегам</p>
    <input
      type="text"
      className="TodoFilter__input"
      value={filter}
      onChange={onChange}
    />
  </div>
);
