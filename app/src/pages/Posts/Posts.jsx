import React, { useEffect } from "react";
import Post from "../../components/Post/Post";
import CSSModules from "react-css-modules";
import styles from "./Posts.module.css";
import useFetch from "../../hooks/useFetch";

const posts = [
  {
    id: 0,
    title: "Learn How to Pre-render Pages Using Static Generation with Next.js",
    author: "Bob Jones",
    image: "bobo",
    createdAt: "2022-11-26T22:37:47.305+00:00",
    updatedAt: "2022-11-26T22:37:47.305+00:00",
    content:
      "<p>Next.js has two forms of pre-rendering: <strong>Static Generation</strong> and <strong>Server-side Rendering</strong>. The difference is in <strong>when</strong> it generates the HTML for a page.</p><ul><li><strong>Static Generation</strong> is the pre-rendering method that generates the HTML at <strong>build time</strong>. The pre-rendered HTML is then <em>reused</em> on each request.</li><li><strong>Server-side Rendering</strong> is the pre-rendering method that generates the HTML on <strong>each request</strong>.</li></ul><p>Importantly, Next.js let's you <strong>choose</strong> which pre-rendering form to use for each page. You can create a 'hybrid' Next.js app by using Static Generation for most pages and using Server-side Rendering for others.</p>",
  },
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
    author: "Shoe storm",
    image: "bobo",
    createdAt: "2022-11-26T22:37:47.305+00:00",
    updatedAt: "2022-11-26T22:37:47.305+00:00",
    content:
      "<p>Next.js has two forms of pre-rendering: <strong>Static Generation</strong> and <strong>Server-side Rendering</strong>. The difference is in <strong>when</strong> it generates the HTML for a page.</p><ul><li><strong>Static Generation</strong> is the pre-rendering method that generates the HTML at <strong>build time</strong>. The pre-rendered HTML is then <em>reused</em> on each request.</li><li><strong>Server-side Rendering</strong> is the pre-rendering method that generates the HTML on <strong>each request</strong>.</li></ul><p>Importantly, Next.js let's you <strong>choose</strong> which pre-rendering form to use for each page. You can create a 'hybrid' Next.js app by using Static Generation for most pages and using Server-side Rendering for others.</p>",
  },
  {
    id: 3,
    title: "Learn How to Pre-render Pages Using Static Generation with Next.js",
    author: "Look toon",
    image: "bobo",
    createdAt: "2022-11-26T22:37:47.305+00:00",
    updatedAt: "2022-11-26T22:37:47.305+00:00",
    content:
      "<p>Next.js has two forms of pre-rendering: <strong>Static Generation</strong> and <strong>Server-side Rendering</strong>. The difference is in <strong>when</strong> it generates the HTML for a page.</p><ul><li><strong>Static Generation</strong> is the pre-rendering method that generates the HTML at <strong>build time</strong>. The pre-rendered HTML is then <em>reused</em> on each request.</li><li><strong>Server-side Rendering</strong> is the pre-rendering method that generates the HTML on <strong>each request</strong>.</li></ul><p>Importantly, Next.js let's you <strong>choose</strong> which pre-rendering form to use for each page. You can create a 'hybrid' Next.js app by using Static Generation for most pages and using Server-side Rendering for others.</p>",
  },
  {
    id: 4,
    title: "Learn How to Pre-render Pages Using Static Generation with Next.js",
    author: "Foo bar",
    image: "bobo",
    createdAt: "2022-11-26T22:37:47.305+00:00",
    updatedAt: "2022-11-26T22:37:47.305+00:00",
    content:
      "<p>Next.js has two forms of pre-rendering: <strong>Static Generation</strong> and <strong>Server-side Rendering</strong>. The difference is in <strong>when</strong> it generates the HTML for a page.</p><ul><li><strong>Static Generation</strong> is the pre-rendering method that generates the HTML at <strong>build time</strong>. The pre-rendered HTML is then <em>reused</em> on each request.</li><li><strong>Server-side Rendering</strong> is the pre-rendering method that generates the HTML on <strong>each request</strong>.</li></ul><p>Importantly, Next.js let's you <strong>choose</strong> which pre-rendering form to use for each page. You can create a 'hybrid' Next.js app by using Static Generation for most pages and using Server-side Rendering for others.</p>",
  },
];



const Posts = () => {
  // const {loading, error, value} = useFetch("../../data/data.json", {});

  return (
    <div styleName="posts">
      {posts.map((post) => (
        <Post {...post} key={post.id}/>
      ))}
    </div>
  );
};

export default CSSModules(Posts, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});
