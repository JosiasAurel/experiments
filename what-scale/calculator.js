"use strict";
/*
This module implements an algorithm to try and find a good scale for plotting graphs manually.
The algorithm is approached using the design of a finite state machine.
*/
exports.__esModule = true;
exports.ScaleCalculator = void 0;
var ScaleCalculator = /** @class */ (function () {
    function ScaleCalculator() {
        this.diff = 0;
        this.min = 0;
        this.max = 0;
        this.numSquares = 0;
        this.initialised = false;
    }
    ScaleCalculator.prototype.init = function (_a) {
        var max = _a.max, min = _a.min, numSquares = _a.numSquares, subdivisions = _a.subdivisions;
        // set variables
        this.max = max;
        this.min = min;
        this.numSquares = numSquares;
        this.subdivisions = subdivisions;
        // set the calculator as initialised
        this.initialised = true;
        // compute the diff
        this.diff = this.max - this.min;
    };
    ScaleCalculator.prototype.computeScale = function () {
        if (this.initialised) {
            // do the job
            this.scale = this.diff / this.numSquares;
            this.subdividedScale = this.scale / this.subdivisions;
            this.rescaleDecimals();
            return this.scale;
        }
        else
            return;
    };
    ScaleCalculator.prototype.rescaleDecimals = function () {
        if (Math.round(this.scale) > 0) {
            this.scale = Math.round(this.scale);
            return;
        }
        if (this.countDecimals(this.subdividedScale) > 2) {
            this.subdividedScale = +this.subdividedScale.toFixed(2);
            this.scale = this.subdividedScale * this.subdivisions;
        }
        if (this.countDecimals(this.scale) >= 2) {
            this.scale += +this.scale.toFixed(2) + 0.01;
            this.subdividedScale = this.scale / this.subdivisions;
            this.rescaleDecimals();
        }
    };
    ScaleCalculator.prototype.countDecimals = function (value) {
        return value.toString().split(".")[1].length;
    };
    return ScaleCalculator;
}());
exports.ScaleCalculator = ScaleCalculator;
