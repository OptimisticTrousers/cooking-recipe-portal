import React from "react";
import styles from "./SinglePostPage.module.css";
import CSSModules from "react-css-modules";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import Date from "../../components/Date/Date";
import { BsCalendar3 } from "react-icons/bs";
import { Editor } from "@tinymce/tinymce-react";

const posts = [
  {
    id: 1,
    title: "Learn How to Pre-render Pages Using Static Generation with Next.js",
    author: "Bob Jones",
    image: "bobo",
    createdAt: "2022-11-26T22:37:47.305+00:00",
    updatedAt: "2022-11-26T22:37:47.305+00:00",
    content:
      "<p>Next.js has two forms of pre-rendering: <strong>Static Generation</strong> and <strong>Server-side Rendering</strong>. The difference is in <strong>when</strong> it generates the HTML for a page.</p><ul><li><strong>Static Generation</strong> is the pre-rendering method that generates the HTML at <strong>build time</strong>. The pre-rendered HTML is then <em>reused</em> on each request.</li><li><strong>Server-side Rendering</strong> is the pre-rendering method that generates the HTML on <strong>each request</strong>.</li></ul><p>Importantly, Next.js let's you <strong>choose</strong> which pre-rendering form to use for each page. You can create a 'hybrid' Next.js app by using Static Generation for most pages and using Server-side Rendering for others.</p>",
  },
  {
    id: 2,
    title: "Learn How to Pre-render Pages Using Static Generation with Next.js",
    author: "Bob Jones",
    image: "bobo",
    createdAt: "2022-11-26T22:37:47.305+00:00",
    updatedAt: "2022-11-26T22:37:47.305+00:00",
    content:
      "<p>Next.js has two forms of pre-rendering: <strong>Static Generation</strong> and <strong>Server-side Rendering</strong>. The difference is in <strong>when</strong> it generates the HTML for a page.</p><ul><li><strong>Static Generation</strong> is the pre-rendering method that generates the HTML at <strong>build time</strong>. The pre-rendered HTML is then <em>reused</em> on each request.</li><li><strong>Server-side Rendering</strong> is the pre-rendering method that generates the HTML on <strong>each request</strong>.</li></ul><p>Importantly, Next.js let's you <strong>choose</strong> which pre-rendering form to use for each page. You can create a 'hybrid' Next.js app by using Static Generation for most pages and using Server-side Rendering for others.</p>",
  },
  {
    id: 3,
    title: "Learn How to Pre-render Pages Using Static Generation with Next.js",
    author: "Shoe storm",
    image: "bobo",
    createdAt: "2022-11-26T22:37:47.305+00:00",
    updatedAt: "2022-11-26T22:37:47.305+00:00",
    content:
      "<p>Next.js has two forms of pre-rendering: <strong>Static Generation</strong> and <strong>Server-side Rendering</strong>. The difference is in <strong>when</strong> it generates the HTML for a page.</p><ul><li><strong>Static Generation</strong> is the pre-rendering method that generates the HTML at <strong>build time</strong>. The pre-rendered HTML is then <em>reused</em> on each request.</li><li><strong>Server-side Rendering</strong> is the pre-rendering method that generates the HTML on <strong>each request</strong>.</li></ul><p>Importantly, Next.js let's you <strong>choose</strong> which pre-rendering form to use for each page. You can create a 'hybrid' Next.js app by using Static Generation for most pages and using Server-side Rendering for others.</p>",
  },
  {
    id: 4,
    title: "Learn How to Pre-render Pages Using Static Generation with Next.js",
    author: "Look toon",
    image: "bobo",
    createdAt: "2022-11-26T22:37:47.305+00:00",
    updatedAt: "2022-11-26T22:37:47.305+00:00",
    content:
      "<p>Next.js has two forms of pre-rendering: <strong>Static Generation</strong> and <strong>Server-side Rendering</strong>. The difference is in <strong>when</strong> it generates the HTML for a page.</p><ul><li><strong>Static Generation</strong> is the pre-rendering method that generates the HTML at <strong>build time</strong>. The pre-rendered HTML is then <em>reused</em> on each request.</li><li><strong>Server-side Rendering</strong> is the pre-rendering method that generates the HTML on <strong>each request</strong>.</li></ul><p>Importantly, Next.js let's you <strong>choose</strong> which pre-rendering form to use for each page. You can create a 'hybrid' Next.js app by using Static Generation for most pages and using Server-side Rendering for others.</p>",
  },
  {
    id: 5,
    title: "Learn How to Pre-render Pages Using Static Generation with Next.js",
    author: "Foo bar",
    image: "bobo",
    createdAt: "2022-11-26T22:37:47.305+00:00",
    updatedAt: "2022-11-26T22:37:47.305+00:00",
    content:
      "<p>Next.js has two forms of pre-rendering: <strong>Static Generation</strong> and <strong>Server-side Rendering</strong>. The difference is in <strong>when</strong> it generates the HTML for a page.</p><ul><li><strong>Static Generation</strong> is the pre-rendering method that generates the HTML at <strong>build time</strong>. The pre-rendered HTML is then <em>reused</em> on each request.</li><li><strong>Server-side Rendering</strong> is the pre-rendering method that generates the HTML on <strong>each request</strong>.</li></ul><p>Importantly, Next.js let's you <strong>choose</strong> which pre-rendering form to use for each page. You can create a 'hybrid' Next.js app by using Static Generation for most pages and using Server-side Rendering for others.</p>",
  },
];

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
