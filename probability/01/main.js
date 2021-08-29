
function $(elementId) {
    return document.getElementById(elementId);
}

// Experiments and outcomes
let experiments = []; // the trials done
let heads = []; // the heads 
let tails = []; // the tails
let allData = [];

// select UI elements
const tossButton = $("tosser");
const coin = $("coin-body");
const outcomeValue = $("outcome");
const prediction = $("prediction");
const experiments__ = $("experiments");

/* 
    The outcome we generate has to be a value between 0 and 1 for a Tail or Head respectively
    The function below is going to generate a value between 0 and 1 which we will normalize in order to get
    one of the possible outcomes
*/
function generateOutcome() {
    const outcomes = ["T", "H"]; // possible outcomes

    const outcomeKey = Math.round(Math.random()); // a random number between 0 and 1 used as index

    const outcome = outcomes[outcomeKey]; // the selected outcome

    return outcome;
}

function tossCoin() {
    const outcome = generateOutcome();

    // put the outcome in the right place
    if (outcome === "H") {
        heads.push(outcome);
    } else {
        tails.push(outcome);
    }

    // add the outcome to the number of experiments carried out
    experiments.push(outcome);

    return outcome;
}

function computeProbability(whichEvent) {
    const sampleSpace = experiments.length;
    const eventsCount = whichEvent === "H" ? heads.length : tails.length;

    return (eventsCount/sampleSpace);
}

function setCoinTo(value) {
    coin.innerText = value;
    return;
}

function setOutcomeTo(value) {
    outcomeValue.innerText = value;
    return;
}

function setProbabilities() {
    const head = $("head");
    const tail = $("tail");

    head.innerText = `Head : ${computeProbability("H")}`;
    tail.innerText = `Tail : ${computeProbability("T")}`;
}

/* 
    The function below computes how an event (in this case the face of a coin) is going
    to occur in average and then returns an array of [averageOccurenceOfTail, averageOccurenceOfHead]
    which we will use to predict how likely an event is going to occur.
*/
function faceAverageOccurence() {
    const headRate = experiments.join("").split("T").filter(node => node !== "");
    const tailRate = experiments.join("").split("H").filter(node => node !== "");

    const headOccurrences = headRate.map(unit => unit.split("").length);
    const tailOccurrences = tailRate.map(unit => unit.split("").length);

    const headAverageOccurrence = ([0, ...headOccurrences].reduce((total, current) => total + current))/experiments.length;
    const tailAverageOccurrence = ([0, ...tailOccurrences].reduce((total, current) => total + current))/experiments.length;

    return [tailAverageOccurrence, headAverageOccurrence];
}

/*
    This function gets the last occurrence count of both faces.
*/
function lastFaceOccurrenceCount() {
    const headRate = experiments.join("").split("T").filter(node => node !== "");
    const tailRate = experiments.join("").split("H").filter(node => node !== "");

    const lastHeadCount = headRate[headRate.length - 1]?.split("").length !== undefined ? headRate[headRate.length - 1]?.split("").length : 0;
    const lastTailCount = tailRate[tailRate.length - 1]?.split("").length !== undefined ? tailRate[tailRate.length - 1]?.split("").length : 0;

    return [lastTailCount, lastHeadCount];
}

/*  
    This function will predict how likely an event Head or Tail is going to occur 
    and then it returns the event as H or T for Head or Tail respectively.

    The function below seems complex but in summary, it still bases on the probability
    of an event to occur and so it is no different to using probability for prediction...
    except it is an over-engineered way. Sorry i just realised this, so i changed the function
    implementation, albeit.
*/
function predict() {

    const averageOccurrences = faceAverageOccurence();
    const faceOccurrences = lastFaceOccurrenceCount();

    // Head
    const averageHead = averageOccurrences[1];
    // const lastHeadCount = faceOccurrences[1];

    // Tail
    const averageTail = averageOccurrences[0];
    // const lastTailCount = faceOccurrences[0];

    if (averageHead > averageTail) {
        return "Head is more likely to occur over Tail";
    } else {
        return "Tail is more likely to occur over Head";
    }

}

tossButton.addEventListener("click", _ => {
    const tossValue = tossCoin(); // toss the coin
    experiments__.innerText = `Experiments : ${experiments.length}`;
    setCoinTo(tossValue); 
    setOutcomeTo(tossValue === "H" ? "Head" : "Tail"); // set outcome value on UI
    setProbabilities(); // set the probability text on UI
    prediction.innerText = predict();

    /* console.log(heads.length)
    console.log(tails.length)
    // console.log(experiments.length)
    
    console.log("Probability of Head")
    console.log(computeProbability("H"))
    console.log("Probability of Tail")
    console.log(computeProbability("T"))

    let result = faceAverageOccurence();
    console.log(result)
    console.log(lastFaceOccurrenceCount()) */

    let unitData = {
        experiments,
        heads,
        tails,
        probabilityOfHead: computeProbability("H"),
        probabilityOfTail: computeProbability("T"),
        headAverageOccurrence: faceAverageOccurence()[1],
        tailAverageOccurrence: faceAverageOccurence()[0],
        lastFaceOccurred: lastFaceOccurrenceCount().indexOf(Math.max(lastFaceOccurrenceCount())) === 0 ? "Tail" : "Head"
    };

    allData.push(unitData);
});
