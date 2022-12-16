import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import CSSModules from "react-css-modules";
import styles from "./Post.module.css";

const Post = ({ id, title, author, createdAt, updatedAt, content }) => {
  return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{author}</p>
              <p className="subtitle is-6">@{author}</p>
            </div>
          </div>

          <div className="content">
            <section styleName="snippet">{parse(content)}</section>
            {/* <a>@bulmaio</a>.<a href="#">#css</a> <a href="#">#responsive</a> */}
            <br />
            <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </div>
  );
};

export default CSSModules(Post, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
