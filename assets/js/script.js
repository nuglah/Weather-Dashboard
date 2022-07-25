var cityFind = document.getElementById("city-find");
var repoList = document.getElementById("list");
var formatType = "";

$("#city-find").on("click", function (event) {
  event.preventDefault();
  //   console.log(event.target.id);
  //   for (let i = 0; i < hours.length; i++) {
  //     if (hours[i].btn === event.target.id) {
  //       const value = document.getElementById(hours[i].el).value;
  //       hours[i].text = value;
  //     }
  //   }
  console.log("beef");
  getSearchProps();
});
// Icons
//https://openweathermap.org/img/wn/13d@2x.png
// Geo
// http://api.openweathermap.org/geo/1.0/direct?q=kansas%20city{&limit=1&appid=1db3202914b346967d7bc18a2c8ad6a9

var getSearchProps = function () {
  const input = document.getElementById("input");
  console.log(input.value);
  const q = input.value;
  var geoUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    encodeURIComponent(q) +
    "&limit=1&appid=1db3202914b346967d7bc18a2c8ad6a9";

  fetch(geoUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (result) {
        // displayRepos(data.items, language);
        console.log("result", result);
        if (result.length) {
          const weatherUrl =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            result[0].lat +
            "&lon=" +
            result[0].lon +
            "&mode=json" +
            "&exclude=hourly,minutely,alerts" +
            "&units=imperial" +
            "&appid=1db3202914b346967d7bc18a2c8ad6a9";
          console.log(weatherUrl);
          fetch(weatherUrl).then(function (response) {
            if (response.ok) {
              response.json().then(function (data) {
                console.log("data", data);
                const current = data.current;
                const imageUrl =
                  "https://openweathermap.org/img/wn/" +
                  current.weather[0].icon +
                  ".png";
                console.log(imageUrl);
                const daily = data.daily;
                const date = dayjs(Date(current.dt)).format("MM/DD/YYYY");
                $("#location").html(`${result[0].name} (${date})`);
                $("#current-weather-img").attr("src", imageUrl);
                $("#current-weather-img").show();
                $("#temp").html(`Temp: ${current.temp}°F`);
                $("#wind").html(`Wind: ${current.wind_speed} MPH`);
                $("#humidity").html(`Humidity: ${current.humidity}%`);
                $("#uv-index").html(`UV Index: ${current.uvi}`);
              });
            } else {
              alert("Error: " + response.statusText);
            }
          });
        } else {
          $("#location").html("No location found.");
        }
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

// function getApi() {
//   var requestUrl =
//     "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=1db3202914b346967d7bc18a2c8ad6a9";

//   fetch(requestUrl)
//     .then(function (response) {
//       return response;
//     })
//     .then(function (data) {
//       //   for (var i = 0; i < data.length; i++) {
//       //     var listItem = document.createElement("li");
//       //     listItem.textContent = data[i].html_url;
//       //     repoList.appendChild(listItem);
//       //   }
//       console.log(data);
//     });
// }

// let sortedScores = scores.sort((a, b) => (a.score > b.score ? -1 : 1));
// for (var i = 0; i < sortedScores.length; i++) {
//   var p = document.createElement("p");
//   p.innerText = `${i + 1} - ${sortedScores[i].initials} - ${
//     sortedScores[i].score
//   }`;
//   highScores.appendChild(p);
// }
