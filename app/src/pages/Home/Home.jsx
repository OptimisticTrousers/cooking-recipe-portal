import styles from "./Home.module.css";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div styleName="home">
      <div styleName="home__container">
        <div styleName="home__text">
          <h1>Hello there!</h1>
          <p styleName="home__description">
            We're here to help you cook delicious meals with less stress and
            more joy. We offer recipes and cooking advice for home cooks, by
            home cooks.
          </p>
        </div>
        <Link to="/recipes">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default CSSModules(Home, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
