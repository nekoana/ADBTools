import { useEffect } from "react";
import "./SearchFloatButton.css";

function SearchFloatButton({ text, onSearchChange }) {
  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };

  const handleFocus = () => {
    let input = document.querySelector("#search-float-input");
    if (input.style.visibility !== "visible") {
      input.focus();
    }
  };

  useEffect(() => {
    document
      .querySelector("#search-float-input")
      .addEventListener("mouseover", handleFocus);

    return () => {
      document
        .querySelector("#search-float-input")
        .removeEventListener("mouseover", handleFocus);
    };
  }, [text]);

  return (
    <button className="search-float-button">
      ⧂
      <input
        className="search-float-input"
        id="search-float-input"
        value={text}
        onChange={handleSearchChange}
      ></input>
    </button>
  );
}

export default SearchFloatButton;
