import React from "react";
import Alert from "react-bootstrap/Alert";

function Banner() {
  return (
    <Alert className="nomination-banner" variant="primary">
      Congrats! You've nominated at least 5 movies!
    </Alert>
  );
}

export default Banner;
