import React, { Fragment, useState } from "react";

import { Layout } from "./../Layouts";
import Button from "./Button";
import { calculateValue, removeInvalidZeros } from "./../Helpers/index";

const CalculatorMain = ({ displayValue, setDisplayValue }) => {
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [operation, setOperation] = useState("");

  const handleSpecialCase = operationValue => {
    switch (operationValue) {
      case "AC":
        setDisplayValue("0");
        setOperation("");
        setFirstInput("");
        setSecondInput("");
        break;
      case "C":
        if (secondInput) {
          setSecondInput("");
          setDisplayValue("0");
        } else {
          setFirstInput("");
          setDisplayValue("0");
        }
        break;
      case "±":
        if (secondInput) {
          if (secondInput.includes("-")) {
            setDisplayValue(secondInput.slice(1));
          } else {
            setDisplayValue("-" + secondInput);
          }
          setSecondInput(String(-+secondInput));
        } else if (firstInput) {
          if (firstInput.includes("-")) {
            setDisplayValue(firstInput.slice(1));
          } else {
            setDisplayValue("-" + firstInput);
          }
          setFirstInput(String(-+firstInput));
        }
        break;
      case "%":
        if (secondInput) {
          setDisplayValue(String(+secondInput / 100));
          setSecondInput(String(+secondInput / 100));
        } else if (firstInput) {
          setDisplayValue(String(+firstInput / 100));
          setFirstInput(String(+firstInput / 100));
        }
        break;
      default:
        console.error("Error in handling special case");
    }
  };

  const handleFullExpression = operationValue => {
    let equals = operationValue === "=";

    if (equals) {
      let calculatedValue = calculateValue(operation, firstInput, secondInput);
      setDisplayValue(String(calculatedValue));
      setFirstInput(String(calculatedValue));
      setSecondInput("");
      // Clear operation value on equals
      setOperation("");
    } else {
      let calculatedValue = calculateValue(operation, firstInput, secondInput);
      setDisplayValue(String(calculatedValue));
      setFirstInput(String(calculatedValue));
      setSecondInput("");
      setOperation(operationValue);
    }
  };

  const handlePartialExpression = operationValue => {
    setDisplayValue(firstInput);
    setOperation(operationValue);
  };

  const handleEmptyExpression = operationValue => {
    setFirstInput("0");
    setOperation(operationValue);
  };

  const handleNumberClick = value => {
    let firstInputEmpty = !firstInput && !secondInput;
    let firstInputProcessing = firstInput && !operation;
    let secondInputProcessing = firstInput && operation;

    if (firstInputEmpty) {
      if (value === ".") {
        setDisplayValue(".");
        setFirstInput("0.");
      } else {
        setDisplayValue(value);
        setFirstInput(value);
      }
    }
    if (firstInputProcessing) {
      if (value === ".") {
        if (firstInput.includes(".")) return;
        setDisplayValue(firstInput + ".");
        setFirstInput(firstInput + ".");
      } else {
        if (firstInput === "0") {
          setDisplayValue(value);
          setFirstInput(value);
        } else if (value === "0") {
          setDisplayValue(removeInvalidZeros(firstInput + value));
          setFirstInput(removeInvalidZeros(firstInput + value));
        } else {
          setDisplayValue(firstInput + value);
          setFirstInput(firstInput + value);
        }
      }
    }
    if (secondInputProcessing) {
      if (value === ".") {
        if (secondInput.includes(".")) return;
        setDisplayValue(secondInput + ".");
        setSecondInput(secondInput + ".");
      } else {
        if (secondInput === "0") {
          setDisplayValue(value);
          setSecondInput(value);
        } else if (value === "0") {
          setDisplayValue(removeInvalidZeros(secondInput + value));
          setSecondInput(removeInvalidZeros(secondInput + value));
        } else {
          setDisplayValue(secondInput + value);
          setSecondInput(secondInput + value);
        }
      }
    }
  };

  const handleOperationClick = operationValue => {
    // Four case categories: emptyExpression, partialExpression, fullExpression, specialCase
    let emptyExpression = !firstInput;
    let partialExpression = firstInput && !secondInput;
    let fullExpression = firstInput && operation && secondInput;
    let specialCase =
      operationValue === "AC" ||
      operationValue === "C" ||
      operationValue === "±" ||
      operationValue === "%";

    if (specialCase) {
      return handleSpecialCase(operationValue);
    } else if (fullExpression) {
      return handleFullExpression(operationValue);
    } else if (partialExpression) {
      return handlePartialExpression(operationValue);
    } else if (emptyExpression) {
      return handleEmptyExpression(operationValue);
    } else {
      console.error("Case unhandled in handleOperationClick");
    }
  };

  return (
    <Fragment>
      <Layout stylesClass="row">
        <Button
          buttonStyle={"light-grey-button"}
          handleClick={() =>
            handleOperationClick(firstInput || secondInput ? "C" : "AC")
          }
          type={firstInput || secondInput ? "C" : "AC"}
        />
        <Button
          buttonStyle={"light-grey-button"}
          handleClick={() => handleOperationClick("±")}
          type={"±"}
        />
        <Button
          buttonStyle={"light-grey-button"}
          handleClick={() => handleOperationClick("%")}
          type={"%"}
        />
        <Button
          buttonStyle={"orange-button operation-button"}
          handleClick={() => handleOperationClick("÷")}
          type={"÷"}
        />
      </Layout>
      <Layout stylesClass="row">
        <Button
          buttonStyle={"dark-grey-button"}
          handleClick={() => handleNumberClick("7")}
          type={"7"}
        />
        <Button
          buttonStyle={"dark-grey-button"}
          handleClick={() => handleNumberClick("8")}
          type={"8"}
        />
        <Button
          buttonStyle={"dark-grey-button"}
          handleClick={() => handleNumberClick("9")}
          type={"9"}
        />
        <Button
          buttonStyle={"orange-button operation-button"}
          handleClick={() => handleOperationClick("×")}
          type={"×"}
        />
      </Layout>
      <Layout stylesClass="row">
        <Button
          buttonStyle={"dark-grey-button"}
          handleClick={() => handleNumberClick("4")}
          type={"4"}
        />
        <Button
          buttonStyle={"dark-grey-button"}
          handleClick={() => handleNumberClick("5")}
          type={"5"}
        />
        <Button
          buttonStyle={"dark-grey-button"}
          handleClick={() => handleNumberClick("6")}
          type={"6"}
        />
        <Button
          buttonStyle={"orange-button operation-button"}
          handleClick={() => handleOperationClick("-")}
          type={"-"}
        />
      </Layout>
      <Layout stylesClass="row">
        <Button
          buttonStyle={"dark-grey-button"}
          handleClick={() => handleNumberClick("1")}
          type={"1"}
        />
        <Button
          buttonStyle={"dark-grey-button"}
          handleClick={() => handleNumberClick("2")}
          type={"2"}
        />
        <Button
          buttonStyle={"dark-grey-button"}
          handleClick={() => handleNumberClick("3")}
          type={"3"}
        />
        <Button
          buttonStyle={"orange-button operation-button"}
          handleClick={() => handleOperationClick("+")}
          type={"+"}
        />
      </Layout>
      <Layout stylesClass="row">
        <Button
          buttonStyle={"dark-grey-button wide-button"}
          handleClick={() => handleNumberClick("0")}
          type={"0"}
        />
        <Button
          buttonStyle={"dark-grey-button"}
          handleClick={() => handleNumberClick(".")}
          type={"."}
        />
        <Button
          buttonStyle={"orange-button operation-button"}
          handleClick={() => handleOperationClick("=")}
          type={"="}
        />
      </Layout>
    </Fragment>
  );
};

export default CalculatorMain;
