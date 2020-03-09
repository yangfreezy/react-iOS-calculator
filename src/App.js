import React, { useState } from "react";
import { DisplayBar, CalculatorMain } from "./Components";
import { Layout } from "./Layouts";

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  return (
    <Layout stylesClass="calculator">
      <DisplayBar displayValue={displayValue} />
      <CalculatorMain
        displayValue={displayValue}
        setDisplayValue={setDisplayValue}
      />
    </Layout>
  );
}

export default App;
