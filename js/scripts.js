import { apiWord } from "./Word.js";

document
    .getElementById("getLocationBtn")
    .addEventListener("click", getLocation);
document
    .getElementById("searchLocationBtn")
    .addEventListener("click", searchLocation);
document
    .getElementById("searchLocation")
    .addEventListener("keyup", function (keyTest) {
        if (keyTest.keyCode === 13) {
            keyTest.preventDefault();
            searchLocation();
        }
    });

function getLocation() {
    var lat;
    var long;

    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;

        var evenNums = [];
        var oddNums = [];
        var newWord = [];

        var word = `${apiWord}`;

        word = word.replaceAll(",", "");

        var testWord = Array.from(word);

        var firstChar = word.slice(0, 1);

        testWord.shift();

        if (testWord.length % 2 === 1) {
            testWord.push(" ");
        }

        for (var i = 0; i < testWord.length; i++) {
            if (i % 2 === 1) {
                evenNums.push(testWord[i]);
            }
        }
        for (var i = 0; i < testWord.length; i++) {
            if (i % 2 === 0) {
                oddNums.push(testWord[i]);
            }
        }
        for (var i = 0; i < oddNums.length || i < evenNums.length; i++) {
            newWord.push(evenNums[i] + oddNums[i]);
        }
        newWord = newWord.toString();
        newWord = newWord.replaceAll(",", "");

        const goingPlaces = firstChar + newWord;

        const nav = `${goingPlaces}${lat},${long}&aqi=no`;

        fetch(nav)
            .then((response) => response.json())
            .then((data) => {
                document.querySelector(
                    ".yourLocation"
                ).textContent = `${data.location.name}, ${data.location.region}`;
                document.querySelector(
                    ".yourTemperature"
                ).textContent = `${data.current.temp_f} F`;
                document.querySelector(
                    ".summary"
                ).textContent = `${data.current.condition.text}`;
                document.querySelector(
                    ".icon"
                ).src = `${data.current.condition.icon}`;
            });
    });
}

function searchLocation() {
    var result;

    result = document.getElementById("searchLocation").value;

    var evenNums = [];
    var oddNums = [];
    var newWord = [];

    var word = `${apiWord}`;

    word = word.replaceAll(",", "");

    var testWord = Array.from(word);

    var firstChar = word.slice(0, 1);

    testWord.shift();

    if (testWord.length % 2 === 1) {
        testWord.push(" ");
    }

    for (var i = 0; i < testWord.length; i++) {
        if (i % 2 === 1) {
            evenNums.push(testWord[i]);
        }
    }
    for (var i = 0; i < testWord.length; i++) {
        if (i % 2 === 0) {
            oddNums.push(testWord[i]);
        }
    }
    for (var i = 0; i < oddNums.length || i < evenNums.length; i++) {
        newWord.push(evenNums[i] + oddNums[i]);
    }
    newWord = newWord.toString();
    newWord = newWord.replaceAll(",", "");

    const goingPlaces = firstChar + newWord;

    const nav = `${goingPlaces}${result}&aqi=no`;

    fetch(nav)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector(
                ".yourLocation"
            ).textContent = `${data.location.name}, ${data.location.region}`;
            document.querySelector(
                ".yourTemperature"
            ).textContent = `${data.current.temp_f} F`;
            document.querySelector(
                ".summary"
            ).textContent = `${data.current.condition.text}`;
            document.querySelector(
                ".icon"
            ).src = `${data.current.condition.icon}`;
        });
    document.getElementById("searchLocation").value = "";
}
