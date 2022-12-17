import styles from "./index.module.css";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div styleName="hero">
      <div styleName="hero__container">
        <div styleName="hero__text">
          <h1 styleName="hero__title">Hello there!</h1>
          <p styleName="hero__description">
            We're here to help you cook delicious meals with less stress and
            more joy. We offer recipes and cooking advice for home cooks, by
            home cooks.
          </p>
        </div>
        <Link to="/posts">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default CSSModules(Hero, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
