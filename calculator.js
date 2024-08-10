// Add a click event listener to the calculator buttons container
document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText); // Process the clicked button's text
  });

let runningTotal = 0; // Stores the current total for operations
let buffer = "0"; // Stores the current input or result displayed on the screen
let previousOperator = null; // Tracks the last operator used for calculations
const screen = document.querySelector(".screen"); // Reference to the calculator display screen

/**
 * Handles the logic for button clicks
 *
 * @param {string} value - The text content of the clicked button
 */
function buttonClick(value) {
  // Remove the flashing effect from the display
  document.querySelector(".screen").classList.toggle("flashing-zero", false);

  // Determine if the clicked value is a number or a symbol
  if (isNaN(value)) {
    handleSymbol(value); // Handle symbol input (e.g., +, -, C, etc.)
  } else {
    handleNumber(value); // Handle numeric input
  }

  // Update the display with the current buffer value
  screen.innerText = buffer;
}

/**
 * Processes a number button click
 *
 * @param {string} numberString - The number button text
 */
function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString; // Replace "0" if it's the initial input
  } else {
    buffer += numberString; // Append the new number to the buffer
  }
}

/**
 * Processes a symbol button click
 *
 * @param {string} symbol - The symbol button text (e.g., +, -, =, etc.)
 */
function handleSymbol(symbol) {
  switch (symbol) {
    case "C": // Clear the calculator screen and reset
      buffer = "0";
      runningTotal = 0;
      document.querySelector(".screen").classList.toggle("flashing-zero", true); // Add flashing effect
      break;

    case "←": // Handle the backspace (delete last digit)
      if (buffer.length === 1) {
        buffer = "0"; // Reset to "0" if all digits are deleted
      } else {
        buffer = screen.innerText.slice(0, -1); // Remove the last digit
        runningTotal = 0;
      }
      break;

    case "=": // Calculate the result
      flushOperation(parseInt(buffer)); // Execute the pending operation
      buffer = runningTotal; // Display the result
      previousOperator = null; // Clear the last operator
      runningTotal = 0; // Reset the running total
      break;

    case "÷":
    case "×":
    case "−":
    case "+": // Handle arithmetic operations
      previousOperator = symbol; // Store the operator
      runningTotal = parseInt(buffer); // Store the current input as running total
      buffer = "0"; // Reset the input buffer for the next number
      break;
  }
}

/**
 * Executes the pending arithmetic operation
 *
 * @param {number} intBuffer - The current number input as an integer
 */
function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "÷":
      runningTotal /= intBuffer; // Perform division
      break;
    case "×":
      runningTotal *= intBuffer; // Perform multiplication
      break;
    case "−":
      runningTotal -= intBuffer; // Perform subtraction
      break;
    case "+":
      runningTotal += intBuffer; // Perform addition
      break;
  }
}
