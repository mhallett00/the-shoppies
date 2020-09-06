import React from "react";
import Button from "react-bootstrap/Button";
import "./SearchResultItem.css";

function SearchResultItem(props) {
  const { title, year, nominations, nominate } = props;

  const getNomination = (nominations, title, year) => {
    for (let nomination of nominations) {
      if (nomination.title === title && nomination.year === year) return true;
    }
    return false;
  };

  return (
    <>
      <li>
        {title} ({year})
        <Button
          onClick={() => nominate(title, year)}
          variant="dark"
          type="submit"
          disabled={nominations && getNomination(nominations, title, year)}
        >
          Nominate
        </Button>
      </li>
    </>
  );
}

export default SearchResultItem;
