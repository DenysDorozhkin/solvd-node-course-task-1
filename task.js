String.prototype.plus = function (string) {
  const numberOne = this;
  const numberTwo = string;
  const result = [];
  let overflow = 0;
  let i = numberOne.length - 1;
  let j = numberTwo.length - 1;

  while (i >= 0 || j >= 0 || overflow) {
    const digitOne = i >= 0 ? parseInt(numberOne[i]) : 0;
    const digitTwo = j >= 0 ? parseInt(numberTwo[j]) : 0;

    const total = digitOne + digitTwo + overflow;
    overflow = Math.floor(total / 10);
    result.unshift(total % 10);

    i--;
    j--;
  }

  return result.join("");
};

String.prototype.minus = function (string) {
  const numberOne = this;
  const numberTwo = string;

  if (numberOne.length < numberTwo.length) {
    throw new Error(
      "First parameter must be greater than the second parameter for subtraction."
    );
  } else if (numberOne.length === numberTwo.length && numberOne <= numberTwo) {
    throw new Error(
      "First parameter must be greater than the second parameter for subtraction."
    );
  }

  const result = [];
  let borrow = 0;
  let i = numberOne.length - 1;
  let j = numberTwo.length - 1;

  while (i >= 0) {
    const digitOne = parseInt(numberOne[i]);
    const digitTwo = j >= 0 ? parseInt(numberTwo[j]) : 0;

    let diff = digitOne - digitTwo - borrow;
    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    result.unshift(diff);

    i--;
    j--;
  }

  return result.join("").replace(/^0+/, "");
};

String.prototype.divide = function (string) {
  const numberOne = this;
  const numberTwo = string;

  if (numberTwo === 0) throw new Error("Division by zero.");
  if (numberOne === numberTwo) return "1";
  if (numberOne === "0") return "0";
  if (numberOne.length < numberTwo.length) {
    throw new Error("Result is not an integer for division.");
  } else if (numberOne.length === numberTwo.length && numberOne < numberTwo) {
    throw new Error("Result is not an integer for division.");
  }

  let result = "";
  let currentIndex = 0;
  let currentDividendPart = numberOne[currentIndex] - "0";

  while (currentDividendPart < numberTwo) {
    currentDividendPart =
      currentDividendPart * 10 +
      numberOne[currentIndex + 1].charCodeAt(0) -
      "0".charCodeAt(0);
    currentIndex += 1;
  }
  currentIndex += 1;

  while (numberOne.length > currentIndex) {
    result += String.fromCharCode(
      Math.floor(currentDividendPart / numberTwo) + "0".charCodeAt(0)
    );

    currentDividendPart =
      (currentDividendPart % numberTwo) * 10 +
      numberOne[currentIndex].charCodeAt(0) -
      "0".charCodeAt(0);
    currentIndex += 1;
  }

  result += String.fromCharCode(
    Math.floor(currentDividendPart / numberTwo) + "0".charCodeAt(0)
  );

  return result;
};

String.prototype.multiply = function (string) {
  const numberOne = this;
  const numberTwo = string;

  if (numberOne === "0" || numberTwo === "0") return "0";

  const result = Array(numberOne.length + numberTwo.length).fill(0);

  for (let i = numberOne.length - 1; i >= 0; i--) {
    let carry = 0;
    const digitOne = parseInt(numberOne[i]);

    for (let j = numberTwo.length - 1; j >= 0; j--) {
      const digitTwo = parseInt(numberTwo[j]);
      const temp = digitOne * digitTwo + carry + result[i + j + 1];
      result[i + j + 1] = temp % 10;
      carry = Math.floor(temp / 10);
    }

    result[i] += carry;
  }

  return result.join("").replace(/^0+/, "");
};
