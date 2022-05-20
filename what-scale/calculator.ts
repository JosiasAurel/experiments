
/*  
This module implements an algorithm to try and find a good scale for plotting graphs manually.
The algorithm is approached using the design of a finite state machine.
*/

type initParams = {
    max: number
    min: number
    numSquares: number
    subdivisions: number
};

class ScaleCalculator {
    private diff: number;
    private max: number;
    private min: number;
    private numSquares: number;
    private subdivisions: number;
    private subdividedScale: number;
    private scale: number;
    private initialised: boolean;

    constructor() {
        this.diff = 0;
        this.min = 0;
        this.max = 0;
        this.numSquares = 0;
        this.initialised = false;
    }

    init({
        max, min, numSquares, subdivisions
    }: initParams) {
        // set variables
        this.max = max;
        this.min = min;
        this.numSquares = numSquares;
        this.subdivisions = subdivisions;

        // set the calculator as initialised
        this.initialised = true;

        // compute the diff
        this.diff = this.max - this.min;
    }

    computeScale() {
        if (this.initialised) {
            // do the job
            this.scale = this.diff / this.numSquares;
            this.subdividedScale = this.scale / this.subdivisions;
            this.rescaleDecimals();
            return this.scale;
        } else return;        
    }

    rescaleDecimals() {

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
    }

    countDecimals(value: number) {
        return value.toString().split(".")[1].length;
    }

    get subScale() {
        return this.subdividedScale;
    }

}

export {
    ScaleCalculator
};