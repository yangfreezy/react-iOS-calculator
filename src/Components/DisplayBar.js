import React from "react";

import "./../styles.css";

const DisplayBar = ({ displayValue }) => {
  return (
    <div className="display-bar">
      {displayValue.length >= 9 || !displayValue.length
        ? "Error"
        : displayValue}
    </div>
  );
};

export default DisplayBar;
