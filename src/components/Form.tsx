import { FormProps } from "../types";

const Form = ({
  value,
  filteredComments,
  isOpen,
  onInputChange,
  onItemClick,
  onInputClick,
}: FormProps) => {
  return (
    <form className="search_form">
      <input
        type="text"
        placeholder="Search in the posts..."
        className="search_input"
        value={value}
        onChange={onInputChange}
        onClick={onInputClick}
      />
      <ul className="autocomplete">
        {value && isOpen
          ? filteredComments.map((comment) => (
              <li
                key={comment.id}
                className="autocomplete_item"
                onClick={onItemClick}
              >
                {comment.email}
              </li>
            ))
          : null}
      </ul>
    </form>
  );
};

export default Form;
