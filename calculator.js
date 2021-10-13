document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });

let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  document.querySelector(".screen").classList.toggle("flashing-zero", false);
  // handling symbols
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    // handling numbers
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      document.querySelector(".screen").classList.toggle("flashing-zero", true);
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = screen.innerText.slice(0, -1);
        runningTotal = 0;
      }
      break;

    case "=":
      flushOperation(parseInt(buffer));
      buffer = runningTotal;
      previousOperator = null;
      runningTotal = 0;

      break;

    case "÷":
    case "×":
    case "−":
    case "+":
      previousOperator = symbol;
      runningTotal = parseInt(buffer);
      buffer = "0";

      break;
  }
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "÷":
      runningTotal /= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "−":
      runningTotal -= intBuffer;
      break;
    case "+":
      runningTotal += intBuffer;
      break;
  }
}
