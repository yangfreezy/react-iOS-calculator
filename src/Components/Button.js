import React from "react";

import { Layout } from "./../Layouts";

const Button = ({ type, buttonStyle, handleClick }) => {
  return (
    <Layout
      onclick={() => handleClick(type)}
      stylesClass={`button ${buttonStyle}`}
    >
      {type}
    </Layout>
  );
};

export default Button;
