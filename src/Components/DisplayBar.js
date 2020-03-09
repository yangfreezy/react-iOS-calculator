import React from "react";

import { Layout } from "./../Layouts";

const DisplayBar = ({ displayValue }) => {
  return (
    <Layout stylesClass="display-bar">
      {displayValue.length >= 9 || !displayValue.length
        ? "Error"
        : displayValue}
    </Layout>
  );
};

export default DisplayBar;
