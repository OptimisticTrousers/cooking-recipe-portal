import React from "react";
import "bulma/css/bulma.min.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Built</strong> by{" "}
          <a href="https://tonyisern.com" target="_blank">
            Tony Isern
          </a>
          ,{" "}
          <a href="https://github.com/abdoul61" target="_blank">
            Souley Abdoul Aziz
          </a>
          , and{" "}
          <a href="https://github.com/elizaclamor" target="_blank">
            Eliza Clamor
          </a>
          . The source code is on
          <a href="https://github.com/OptimisticTrousers/cooking-recipe-portal">
            {" "}
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
