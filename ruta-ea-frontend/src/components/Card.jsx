import React from "react";

const Card = ({ title, children, tag }) => {
  return (
    <article className="card">
      {tag && <span className="card-tag">{tag}</span>}
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-body">{children}</div>
    </article>
  );
};

export default Card;
