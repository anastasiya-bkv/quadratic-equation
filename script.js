const varA = document.getElementById("a");
const varB = document.getElementById("b");
const varC = document.getElementById("c");
const varInputs = document.querySelectorAll(".varInput");
const btnSolution = document.getElementById("btnSolution");
const solution = document.getElementById("solution");
const equation = document.getElementById("equation");
const errorMessage = document.getElementById("error");

// функция проверки, что все инпуты заполнены, и рендера уравнения
function validateInputFill() {
  errorMessage.style.display = "";
  const a = varA.value;
  const b = varB.value;
  const c = varC.value;
  if (a && b && c) {
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      errorMessage.style.display = "block";
    } else {
      btnSolution.disabled = false;
    }
  } else {
    btnSolution.disabled = true;
  }
  solution.innerHTML = "";
  equation.innerHTML = `${a < 0 ? "- " : ""}${
    a ? Math.abs(a) : "a"
  }x<sup>2</sup> ${b < 0 ? "-" : "+"} ${b ? Math.abs(b) : "b"}x ${
    c < 0 ? "-" : "+"
  } ${c ? Math.abs(c) : "c"} = 0`;
}

// функция, которая позволяет вводить в инпуты только цифры, '-', '.' и нажимать Backspace, Enter, Tab
function validateInputNumbers(event) {
  if (
    (event.key >= 0 && event.key <= 9) ||
    event.code == "Minus" ||
    event.key == "." ||
    event.key == "Tab" ||
    event.key == "Enter" ||
    event.code == "Backspace"
  ) {
    event.returnValue = true;
  } else {
    event.returnValue = false;
  }
}

//функция решения квадратного уравнения
function quadraticEquation(a, b, c) {
  const x = [];
  const D = Math.pow(b, 2) - 4 * a * c;
  if (D < 0) {
    return x;
  }
  if (D >= 0) {
    if (a === 0) {
      if (b === 0) {
        x.push(0);
      } else {
        const x3 = -c / b;
        x.push(x3);
      }
    } else {
      const x1 = (-b - Math.sqrt(D)) / (2 * a);
      const x2 = (-b + Math.sqrt(D)) / (2 * a);
      if (x1 === x2) {
        x.push(x1);
      } else {
        x.push(x1, x2);
      }
    }
  }
  return x;
}

//функция вывода решения уравнения
function renderSolution(event) {
  event.preventDefault();
  solution.innerHTML = "";
  const a = Number(varA.value);
  const b = Number(varB.value);
  const c = Number(varC.value);
  const x = quadraticEquation(a, b, c);
  if (x.length === 0) {
    solution.innerHTML = "D < 0, уравнение не имеет решения";
  }
  if (x.length === 1) {
    solution.innerHTML = `x = ${x[0]}`;
  }
  if (x.length === 2) {
    solution.innerHTML = `x<sub>1</sub> = ${x[0]}, x<sub>2</sub> = ${x[1]}`;
  }
}

// вешаем обработчики событий на каждый инпут
varInputs.forEach((varInput) => {
  varInput.addEventListener("input", validateInputFill);
  varInput.addEventListener("keydown", (e) => validateInputNumbers(e));
});

// вешаем обработчик события на кнопку "Решить"
btnSolution.addEventListener("click", (e) => renderSolution(e));
