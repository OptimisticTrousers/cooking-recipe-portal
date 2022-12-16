import React from "react";
import styles from "./SinglePostPage.module.css";
import CSSModules from "react-css-modules";

const SinglePostPage = () => {
  return (
   <main className="container">
        <div className="card-padding">
          <h2 className="blog__title">
            {
              !cosmic.post &&
              <div style={{ textAlign: 'center' }}>Post Not found</div>
            }
            {
              cosmic.post &&
              <Link href={`/posts/${cosmic.post.slug}`}><a>{cosmic.post.title}</a></Link>
            }
          </h2>
          {
            cosmic.post &&
            <div>
              <div className="blog__author">
                <Link href={`/author/${cosmic.post.metadata.author.slug}`}>
                  <a>
                    <div className="blog__author-image" style={{ backgroundImage: `url(${cosmic.post.metadata.author.metadata.image.imgix_url}?w=100)`}}></div>
                  </a>
                </Link>
                <div className="blog__author-title">by <Link href={`/author/${cosmic.post.metadata.author.slug}`}><a>{cosmic.post.metadata.author.title}</a></Link> on {cosmic.post.friendly_date}</div>
                <div className="clearfix"></div>
              </div>
              <div className="blog__teaser droid" dangerouslySetInnerHTML={{__html: cosmic.post.content}}></div>
            </div>
          }
        </div>
      </main> 
  )
}

export default CSSModules(SinglePostPage, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: "log",
});