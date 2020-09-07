import React, { useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./Nominations.css";
import NominationEntry from "./NominationEntry";

function Nominations(props) {
  const { nominations, removeNomination } = props;

  const nodeRef = useRef(null);

  const movies = nominations
    ? nominations.map((movie, index) => {
        return (
          <CSSTransition
            nodeRef={nodeRef}
            key={index}
            timeout={500}
            classNames="nomination"
          >
            <NominationEntry
              id={index}
              title={movie.title}
              year={movie.year}
              removeNomination={removeNomination}
            />
          </CSSTransition>
        );
      })
    : "No Nominations!";
  return (
    <>
      <h5>Your Nominations</h5>
      <ul>
        <TransitionGroup className="nomination-list">{movies}</TransitionGroup>
      </ul>
    </>
  );
}

export default Nominations;
