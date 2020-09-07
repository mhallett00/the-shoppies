import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import "./Search.css";
import SearchResults from "./SearchResults";
import Nominations from "./Nominations";
import Banner from "./Banner";

function Search() {
  let nominations = localStorage.getItem("nominations")
    ? JSON.parse(localStorage.getItem("nominations"))
    : [];

  console.log(Array.isArray(nominations));
  const [search, setSearch] = useState({
    terms: "",
    results: [],
    nominations,
  });

  console.log(Array.isArray(search.nominations));
  const handleChange = (e) => {
    setSearch({ ...search, terms: e.target.value });
  };

  const nominate = (title, year) => {
    const nomination = { title, year };

    setSearch({ ...search }, search.nominations.push(nomination));
    localStorage.setItem("nominations", JSON.stringify(search.nominations));
  };

  const removeNomination = (id) => {
    setSearch({ ...search }, search.nominations.splice(id, 1));
  };

  useEffect(() => {
    if (search.terms === "") return;

    axios
      .get(
        `https://www.omdbapi.com/?s=${search.terms}*&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      )
      .then((res) => {
        setSearch((search) => ({
          ...search,
          results: res.data.Search,
        }));
      })
      .catch((e) => console.log(e));
  }, [search.terms]);

  return (
    <div className="Search">
      <div className="card search-container">
        <Form
          className="card-body search-container-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <Form.Group controlId="title">
            <Form.Label>Movie Title</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <i className="fa fa-search"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="movie-title"
                placeholder="Search for your Nominee!"
                value={search.terms}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
      <div className="nomination-banner">
        {search.nominations.length >= 5 && <Banner />}
      </div>
      <div className="results-nominations">
        <div className="card search-results">
          <SearchResults
            searchResults={search.results}
            searchParams={search.terms}
            nominations={search.nominations}
            nominate={nominate}
          />
        </div>
        <div className="card nominations">
          <Nominations
            nominations={search.nominations}
            removeNomination={removeNomination}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
