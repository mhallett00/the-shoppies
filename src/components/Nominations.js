import React from "react";
import "./Nominations.css";
import NominationEntry from "./NominationEntry";

function Nominations(props) {
  const { nominations, removeNomination } = props;
  const movies = nominations
    ? nominations.map((movie, index) => {
        return (
          <NominationEntry
            key={index}
            id={index}
            title={movie.title}
            year={movie.year}
            removeNomination={removeNomination}
          />
        );
      })
    : "No Nominations!";
  return (
    <>
      <h5>Your Nominations</h5>
      <ul>{movies}</ul>
    </>
  );
}

export default Nominations;
