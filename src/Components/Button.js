import React from "react";

import "./../styles.css";

const Button = ({ type, buttonStyle, handleClick }) => {
  return (
    <div onClick={() => handleClick(type)} className={`button ${buttonStyle}`}>
      {type}
    </div>
  );
};

export default Button;
