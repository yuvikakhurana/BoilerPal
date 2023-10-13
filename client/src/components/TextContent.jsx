import React from "react";

const TextContent = ({ title, desc, children }) => {
  return (
    <div style={{ textAlign: "left", paddingTop: "3rem", paddingLeft: "0" }} >
      <h2 className="feature_section_heading">{title}</h2>
      <h4 className="mt-3 feature_section_sub_heading">{desc}</h4>
    </div>
  );
};

export default TextContent;
