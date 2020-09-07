import React from "react";
import "./SearchResults.css";
import SearchResultItem from "./SearchResultItem";
import Loader from "./Loader";

function SearchResults(props) {
  const { searchResults, searchParams, nominations, nominate, loading } = props;

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
      <h5>Search Results {searchParams && `for ${searchParams}`}</h5>
      {(loading && <Loader />) || <ul>{movies}</ul>}
    </>
  );
}

export default SearchResults;
