
import { ScaleCalculator } from "./calculator";

const form = document.getElementById("form");

form.addEventListener("submit", event => {
    event.preventDefault(); // prevent browser from reloading

    const max = document.getElementById("max") as HTMLInputElement;
    const min = document.getElementById("min") as HTMLInputElement;
    const numSquares = document.getElementById("numSquares") as HTMLInputElement;
    const subdivisions = document.getElementById("subdivisions") as HTMLInputElement;

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
    } else alert("Woops you might have forgotten to fill in some value 🙄");


});


