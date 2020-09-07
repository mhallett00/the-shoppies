import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./Search.css";

function Search(props) {
  // Checking for saved nominations

  const { onChange } = props;

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
                placeholder="Search for your Nominees!"
                onChange={onChange}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default Search;
