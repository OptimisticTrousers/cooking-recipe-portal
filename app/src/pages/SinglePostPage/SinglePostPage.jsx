import React from "react";
import styles from "./SinglePostPage.module.css";
import CSSModules from "react-css-modules";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import Date from "../../components/Date/Date";
import { BsCalendar3 } from "react-icons/bs";
import { posts } from "../../data/data";
import useFetch from "../../hooks/useFetch";
import { apiDomain } from "../../utils/utils";
import Loading from "../../components/Loading/Loading";

const SinglePostPage = (props) => {
  const { recipeId } = useParams();

  const {loading, error, value} = useFetch(`${apiDomain()}/api/recipes/${recipeId}`)

  if(loading) {
    return <Loading />
  }

  return (
    <article styleName="post">
      <h2 styleName={`post__title`}>{value.recipeTitle}</h2>
      <hr />
      <p styleName="post__category">Category: {value.recipeCategory}</p>
      <p styleName="post__date">
        <BsCalendar3 />
        {/* <Date dateString={value.createdAt} /> */}
        by
        <span styleName="post__author">{value.recipeAuthor}</span>
      </p>
      <section styleName={`post__description`}>{parse(value.recipeContent)}</section>
    </article>
  );
};

export default CSSModules(SinglePostPage, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
