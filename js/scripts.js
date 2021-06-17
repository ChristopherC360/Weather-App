import { apiWord } from "./Word.js";

const weekdays = new Array(
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
const currDate = new Date();
document.querySelector(".nowDate").innerHTML = currDate.toDateString();
const nextDay = currDate.getDay()+1;
document.querySelector("#day1Date").innerHTML = weekdays[nextDay];
const nextDay2 = currDate.getDay()+2;
document.querySelector("#day2Date").innerHTML = weekdays[nextDay2];
const nextDay3 = currDate.getDay()+3;
document.querySelector("#day3Date").innerHTML = weekdays[nextDay3];


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

        const nav = `${goingPlaces}${lat},${long}&days=3&aqi=no`;

        fetch(nav)
            .then((response) => response.json())
            .then((data) => {
                document.querySelector(
                    ".yourLocation"
                ).textContent = `${data.location.name}, ${data.location.region}`;
                document.querySelector(
                    ".yourTemperature"
                ).innerHTML = `${data.current.temp_f}<sup>&#8457;</sup>`;
                document.querySelector(
                    ".feelsLikeTemp"
                ).innerHTML = `${data.current.feelslike_f}<sup>&#8457;</sup>`;
                document.querySelector(
                    ".summary"
                ).textContent = `${data.current.condition.text}`;
                document.querySelector(
                    ".humidity"
                ).innerHTML = `${data.current.humidity}%`;
                document.querySelector(
                    ".windSpeed"
                ).innerHTML = `${data.current.wind_mph}mph / ${data.current.wind_dir}`;

                // Weather Forecast Rows
                document.querySelector(
                    "#day1Img"
                ).src = `${data.forecast.forecastday[0].day.condition.icon}`;
                document.querySelector(
                    "#day1Temp"
                ).innerHTML = `${data.forecast.forecastday[0].day.mintemp_f}/${data.forecast.forecastday[0].day.maxtemp_f}`;

                document.querySelector(
                    "#day2Img"
                ).src = `${data.forecast.forecastday[1].day.condition.icon}`;
                document.querySelector(
                    "#day2Temp"
                ).innerHTML = `${data.forecast.forecastday[1].day.mintemp_f}/${data.forecast.forecastday[0].day.maxtemp_f}`;

                document.querySelector(
                    "#day3Img"
                ).src = `${data.forecast.forecastday[2].day.condition.icon}`;
                document.querySelector(
                    "#day3Temp"
                ).innerHTML = `${data.forecast.forecastday[2].day.mintemp_f}/${data.forecast.forecastday[0].day.maxtemp_f}`;

                console.log(data);
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

    const nav = `${goingPlaces}${result}&days=3&aqi=no`;

    fetch(nav)
        .then((response) => response.json())
        .then((data) => {
            document.querySelector(
                ".yourLocation"
            ).textContent = `${data.location.name}, ${data.location.region}`;
            document.querySelector(
                ".yourTemperature"
            ).innerHTML = `${data.current.temp_f}<sup>&#8457;</sup>`;
            document.querySelector(
                ".summary"
            ).textContent = `${data.current.condition.text}`;
            document.querySelector(
                ".icon"
            ).src = `${data.current.condition.icon}`;
            document.querySelector(
                ".feelsLikeTemp"
            ).innerHTML = `${data.current.feelslike_f}<sup>&#8457;</sup>`;
            document.querySelector(
                ".humidity"
            ).innerHTML = `${data.current.humidity}%`;
            document.querySelector(
                ".windSpeed"
            ).innerHTML = `${data.current.wind_mph}mph / ${data.current.wind_dir}`;
            document.querySelector(
                ".icon"
            ).src = `${data.current.condition.icon}`;
        });
    document.getElementById("searchLocation").value = "";
}
