import React from "react";
import styles from "./SinglePostPage.module.css";
import CSSModules from "react-css-modules";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import Date from "../../components/Date/Date";
import { BsCalendar3 } from "react-icons/bs";
import {posts} from "../../data/data"

const SinglePostPage = () => {
  const { postId } = useParams();

  const { createdAt, author, content, title } = posts.find(
    (item) => item.id === Number(postId)
  );

  return (
    <article styleName="post">
      <h2 styleName={`post__title`}>{title}</h2>
      <hr />
      <p styleName="post__date">
        <BsCalendar3 />
        <Date dateString={createdAt} />
        by
        <span styleName="post__author">{author}</span>
      </p>
      <section styleName={`post__description`}>{parse(content)}</section>
    </article>
  );
};

export default CSSModules(SinglePostPage, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
