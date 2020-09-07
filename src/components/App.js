import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Search from "./Search";
import Banner from "./Banner";
import SearchResults from "./SearchResults";
import Nominations from "./Nominations";
import useDebounce from "../hooks/UseDebounce";

function App() {
  let nominations = localStorage.getItem("nominations")
    ? JSON.parse(localStorage.getItem("nominations"))
    : [];

  const [search, setSearch] = useState({
    terms: "",
    results: [],
    nominations,
    loading: false,
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
            loading: false,
          }));
        })
        .catch((e) => console.log(e));
    } else {
      setSearch((search) => ({
        ...search,
        results: [],
        loading: false,
      }));
    }
  }, [debouncedTerms]);

  return (
    <div className="App">
      <header className="App-the-shoppies">
        <h1>The Shoppies</h1>
      </header>
      <Search
        onChange={(e) => {
          setSearch({ ...search, terms: e.target.value, loading: true });
        }}
      />
      <div className="nomination-banner">
        {search.nominations.length >= 5 && <Banner />}
      </div>
      <div className="results-nominations">
        <div className="card search-results">
          <SearchResults
            loading={search.loading}
            nominations={search.nominations}
            nominate={(title, year) => {
              const nomination = { title, year };

              setSearch({ ...search }, search.nominations.push(nomination));
              localStorage.setItem(
                "nominations",
                JSON.stringify(search.nominations)
              );
            }}
            searchResults={search.results}
            searchParams={search.terms}
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
