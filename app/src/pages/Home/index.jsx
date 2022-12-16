import styles from "./index.module.css";
import CSSModules from "react-css-modules";

const Hero = () => {
  return (
    <div styleName="hero">
      <div styleName="hero__container">
        <div styleName="hero__text">
          <h1 styleName="hero__title">Hello there</h1>
          <p styleName="hero__description">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <button className="btn btn-primary">Get Started</button>
      </div>
    </div>
  );
};

export default CSSModules(Hero, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
