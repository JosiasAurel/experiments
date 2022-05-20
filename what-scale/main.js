import { ScaleCalculator } from "./calculator.js";
const form = document.getElementById("form");
form.addEventListener("submit", event => {
    event.preventDefault(); // prevent browser from reloading
    const max = document.getElementById("max");
    const min = document.getElementById("min");
    const numSquares = document.getElementById("numSquares");
    const subdivisions = document.getElementById("subdivisions");
    const sc = new ScaleCalculator();
    if (max.value && min.value && numSquares.value && subdivisions.value) {
        // initialize calculator
        sc.init({
            max: parseFloat(max.value),
            min: parseFloat(min.value),
            numSquares: parseFloat(numSquares.value),
            subdivisions: parseFloat(subdivisions.value)
        });
        // compute scale
        const scale = sc.computeScale();
        const subScale = sc.subScale;
        alert(`Each square represents ${scale} unit(s). Each subdivision would then be ${subScale}`);
    }
    else
        alert("Woops you might have forgotten to fill in some value 🙄");
});
