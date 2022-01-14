
const currentInputs = [];
let trials = 0;
let combinations = 0;
let difficulty = 3;

// impure
function incrementTrials() {
    trials++;
    document.getElementById("trials").innerText = `Trials : ${trials}`;
}

function setTest(isPassed) {
    const testEl = document.getElementById("test");
    if (isPassed) {
        testEl.innerText = "Passed";
        testEl.style.color = "greenyellow";
    } else {
        testEl.innerText = "Failed";
        testEl.style.color = "red";
    }
}

// impure
function setCombinations() {
    const combinationsArray = Array(difficulty).fill(0);
    combinationsArray.unshift(1);
    const combinations = parseInt(combinationsArray.join("")); // computeCombinations(9, 3);
    console.log(Array(difficulty).fill(0).unshift(1));
    document.getElementById("combinations").innerText = `Combinations Left : ${combinations - trials}`;
}

function computeCombinations(n, r) {
    const nFactorial = factorial(n);
    const diffNRFactorial = factorial(n-r);
    const rFactorial = factorial(r);
    const combinations = nFactorial/(diffNRFactorial*rFactorial);
    return combinations;
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n*factorial(n-1);
}

function generateNewKey(count) {
    const valuesSpace = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const generatedKey = [];
    let currentCount = 0;
    while (currentCount < count) {
        let generatedValue = valuesSpace[Math.floor(Math.random()*valuesSpace.length)];
        generatedKey.push(generatedValue);
        currentCount++;
    }
    return generatedKey.join("").toString();
}

function createInput() {
    let newInput = document.createElement("input");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("placeholder", "0");
    newInput.setAttribute("max", "9");
    newInput.setAttribute("min", "0");

    return newInput;
}

// impure
function initGame() {
    let newDifficulty = parseInt(prompt("Enter difficulty level. Leave blank for difficulty level 3")) ?? undefined;
    difficulty = newDifficulty ? newDifficulty : 3;
    const controls = document.getElementById("controls");
    controls.innerHTML = ""; // first clear the inputs ;)
    let count = 0;
    while (count < difficulty) {
        controls.appendChild(createInput());
        count++;
    }
}

// impure
function initInputs() {
    const formControls = document.getElementById("controls");
    for (let i = 0; i < formControls.children.length; i++) {
        const currentChild = formControls.children[i];
        currentInputs.push(0);
        currentChild.addEventListener("change", e => {
            currentInputs[i] = parseInt(e.target.value);
            // console.log(e.target.value)
            console.log(currentInputs);
        });
    }   
}

document.getElementById("form")
    .addEventListener("submit", e => {
        e.preventDefault(); // pls don't reload the browser

        const currentKey = sessionStorage.getItem("key");
        const isPassed = currentInputs.join("").toString() === currentKey ? true : false;
        incrementTrials();
        setTest(isPassed);
        setCombinations();
    });


function game() {
    initGame();
    initInputs();
    const newKey = generateNewKey(difficulty);
    sessionStorage.setItem("key", newKey);
    // console.log(newKey);
}

window.addEventListener("load", () => {
    game();
    setCombinations();
    document.getElementById("newGame").addEventListener("click", game);
});