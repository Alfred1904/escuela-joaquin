import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <section className="page-header">
      <h1>{title}</h1>
      {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
    </section>
  );
};

export default PageHeader;
