import React, { useState } from "react";
import { DisplayBar, CalculatorMain } from "./Components";
import { CalculatorLayout } from "./Layouts";

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  return (
    <div>
      <CalculatorLayout>
        <DisplayBar displayValue={displayValue} />
        <CalculatorMain
          displayValue={displayValue}
          setDisplayValue={setDisplayValue}
        />
      </CalculatorLayout>
    </div>
  );
}

export default App;
