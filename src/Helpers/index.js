const truncateDecimals = (number, digits) => {
  var multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? "ceil" : "floor"](adjustedNum);

  return truncatedNum / multiplier;
};

const removeInvalidZeros = str => {
  if (str.split("").every(char => char === "0")) return "0";
  let parsed = "";
  let nonZeroCharFound = false;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === "." || (str[i + 1] && str[i + 1] === ".")) {
      parsed += str.slice(i);
      break;
    }
    if (str[i] === "0" && str[i + 1] === ".") {
      parsed += str.slice(i);
      break;
    }
    if (str[i] !== "0") {
      nonZeroCharFound = true;
      parsed += str[i];
    }
    if (str[i] === "0" && nonZeroCharFound) {
      parsed += str[i];
    }
  }
  return parsed;
};

const calculateValue = (operation, firstInput, secondInput) => {
  switch (operation) {
    case "÷":
      return truncateDecimals((+firstInput / +secondInput).toPrecision(7), 5);
    case "×":
      return truncateDecimals((+firstInput * +secondInput).toPrecision(7), 5);
    case "-":
      return truncateDecimals((+firstInput - +secondInput).toPrecision(7), 5);
    case "+":
      return truncateDecimals((+firstInput + +secondInput).toPrecision(7), 5);
    default:
      console.error("Error calculating value");
  }
};

export { truncateDecimals, calculateValue, removeInvalidZeros };
