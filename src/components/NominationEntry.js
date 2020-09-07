import React from "react";
import Button from "react-bootstrap/Button";

function NominationEntry(props) {
  const { title, year, removeNomination, id } = props;
  return (
    <li className="Movie-entry">
      {title} ({year})
      <Button variant="dark" type="submit" onClick={() => removeNomination(id)}>
        Remove
      </Button>
    </li>
  );
}

export default NominationEntry;
