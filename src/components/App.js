import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";
import axios from "axios";
import "./Search.css";
import SearchResults from "./SearchResults";
import Nominations from "./Nominations";
import Banner from "./Banner";
import useDebounce from "../hooks/UseDebounce";

function App() {
  let nominations = localStorage.getItem("nominations")
    ? JSON.parse(localStorage.getItem("nominations"))
    : [];

  const [search, setSearch] = useState({
    terms: "",
    results: [],
    nominations,
  });

  const debouncedTerms = useDebounce(search.terms, 400);

  useEffect(() => {
    if (debouncedTerms) {
      axios
        .get(
          `https://www.omdbapi.com/?s=${debouncedTerms}*&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
        )
        .then((res) => {
          setSearch((search) => ({
            ...search,
            results: res.data.Search,
          }));
        })
        .catch((e) => console.log(e));
    } else {
      return;
    }
  }, [debouncedTerms]);

  return (
    <div className="App">
      <header className="App-the-shoppies">
        <h1>The Shoppies</h1>
      </header>
      <Search
        onChange={(e) => {
          setSearch({ ...search, terms: e.target.value });
        }}
      />
      <div className="nomination-banner">
        {search.nominations.length >= 5 && <Banner />}
      </div>
      <div className="results-nominations">
        <div className="card search-results">
          <SearchResults
            searchResults={search.results}
            searchParams={search.terms}
            nominations={search.nominations}
            nominate={(title, year) => {
              const nomination = { title, year };

              setSearch({ ...search }, search.nominations.push(nomination));
              localStorage.setItem(
                "nominations",
                JSON.stringify(search.nominations)
              );
            }}
          />
        </div>
        <div className="card nominations">
          <Nominations
            nominations={search.nominations}
            removeNomination={(id) => {
              setSearch({ ...search }, search.nominations.splice(id, 1));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
