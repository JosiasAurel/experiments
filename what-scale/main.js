"use strict";
exports.__esModule = true;
var calculator_1 = require("./calculator");
var form = document.getElementById("form");
form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent browser from reloading
    var max = document.getElementById("max");
    var min = document.getElementById("min");
    var numSquares = document.getElementById("numSquares");
    var subdivisions = document.getElementById("subdivisions");
    var sc = new calculator_1.ScaleCalculator();
    if (max.value && min.value && numSquares.value && subdivisions.value) {
        // initialize calculator
        sc.init({
            max: parseInt(max.value),
            min: parseInt(min.value),
            numSquares: parseInt(numSquares.value),
            subdivisions: parseInt(subdivisions.value)
        });
        // compute scale
        var scale = sc.computeScale();
        alert("Each square represents " + scale + " unit(s). Each subdivision would then be");
    }
    else
        alert("Woops you might have forgotten to fill in some value 🙄");
});
