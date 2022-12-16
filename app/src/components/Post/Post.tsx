import React from "react";
import { Link } from "react-router-dom";

const Post = ({title, author, createdAt, updatedAt, content}) => {
  return (
    <div className="card">
      <Link to="/posts/1">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="https://bulma.io/images/placeholders/1280x9{60.png"
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

          <div className="content" >
            {content}
            <br />
            <time dateTime="2016-1-1">{createdAt}</time>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
