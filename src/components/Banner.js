import React from "react";
import Alert from "react-bootstrap/Alert";

function Banner(props) {
  const { nominations } = props;

  return (
    <Alert
      show={nominations.length >= 5}
      className="nomination-banner"
      variant="primary"
    >
      Congrats! You've nominated at least 5 movies!
    </Alert>
  );
}

export default Banner;
