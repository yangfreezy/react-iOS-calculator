import React from "react";

import "./../styles.css";

const Layout = ({ stylesClass, children, onclick }) => {
  return (
    <div className={stylesClass} onClick={onclick || null}>
      {children}
    </div>
  );
};

export default Layout;
