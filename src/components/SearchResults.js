import React from "react";
import "./SearchResults.css";
import SearchResultItem from "./SearchResultItem";

function SearchResults(props) {
  const { searchResults, searchParams, nominations, nominate } = props;

  const movies = searchResults
    ? searchResults.map((movie, index) => {
        return (
          <SearchResultItem
            key={index}
            title={movie.Title}
            year={movie.Year}
            nominations={nominations}
            nominate={nominate}
          />
        );
      })
    : "No Results!";
  return (
    <>
      <h5>{searchResults && `Results for "${searchParams}"`}</h5>
      <ul>{movies}</ul>
    </>
  );
}

export default SearchResults;
