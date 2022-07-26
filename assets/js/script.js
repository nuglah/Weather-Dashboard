var cityFind = document.getElementById("city-find");
var formatType = "";
var cityHistory = document.getElementById("list");
var locations = JSON.parse(localStorage.getItem("locations")) || [];

function getLocalStorage() {
  $("#history").empty();
  if (locations.length) {
    for (let i = 0; i < locations.length; i++) {
      const buttons = $(
        "<div class='row mt-1'><button class=' historyBtn btn btn-secondary btn-block'>" +
          locations[i].city +
          "</button></div>"
      );
      buttons.appendTo("#history");
    }
  }
  $(".historyBtn").on("click", function (event) {
    event.preventDefault();
    console.log("event", event.target.innerText);
    if (event.target.innerText !== "") {
      $('input[name="city-input"]').val(event.target.innerText);
      getSearchProps(event.target.innerText, false);
    }
  });
}
getLocalStorage();

$("#city-find").on("click", function (event) {
  event.preventDefault();
  console.log("beef");
  getSearchProps(document.getElementById("input").value, true);
});

var getSearchProps = function (input, saveHistory) {
  const q = input;
  var geoUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    encodeURIComponent(q) +
    "&limit=1&appid=1db3202914b346967d7bc18a2c8ad6a9";

  fetch(geoUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (result) {
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

          fetch(weatherUrl).then(function (response) {
            if (response.ok) {
              response.json().then(function (data) {
                const current = data.current;
                const imageUrl =
                  "https://openweathermap.org/img/wn/" +
                  current.weather[0].icon +
                  ".png";

                const daily = data.daily;

                for (let i = 1; i < 6; i++) {
                  const dailyImageUrl =
                    "https://openweathermap.org/img/wn/" +
                    daily[i].weather[0].icon +
                    ".png";
                  const date = dayjs().add(i, "day").format("MM/DD/YYYY");
                  $("#date" + i).html(date);
                  $("#daily-weather-img" + i).attr("src", dailyImageUrl);
                  $("#daily-weather-img" + i).show();
                  $("#temp" + i).html(`Temp: ${daily[i].temp.max}°F`);
                  $("#wind" + i).html(`Wind: ${daily[i].wind_speed} MPH`);
                  $("#humidity" + i).html(`Humidity: ${daily[i].humidity}%`);
                }
                $("#forecast").attr("style", "display:block;");
                const date = dayjs().format("MM/DD/YYYY");
                $("#location").html(`${result[0].name} (${date})`);
                $("#current-weather-img").attr("src", imageUrl);
                $("#current-weather-img").show();
                $("#temp").html(`Temp: ${current.temp}°F`);
                $("#wind").html(`Wind: ${current.wind_speed} MPH`);
                $("#humidity").html(`Humidity: ${current.humidity}%`);
                if (current.uvi !== "") {
                  $("#uv-span").attr("style", "display:block");
                  if (parseFloat(current.uvi) <= 3.67) {
                    $("#uv-index").attr(
                      "style",
                      "background-color:green; color:white; border-radius:5px; padding:2px;"
                    );
                  }
                  if (
                    parseFloat(current.uvi) > 3.67 &&
                    parseFloat(current.uvi) < 7.34
                  ) {
                    $("#uv-index").attr(
                      "style",
                      "background-color:orange; color:white; border-radius:5px; padding:2px;"
                    );
                  }
                  if (parseFloat(current.uvi) > 7.34) {
                    $("#uv-index").attr(
                      "style",
                      "background-color:red; color:white; border-radius:5px; padding:2px;"
                    );
                  }
                  $("#uv-index").html(`${current.uvi}`);
                }

                if (saveHistory) {
                  locations.unshift({ city: result[0].name, url: weatherUrl });
                  localStorage.setItem("locations", JSON.stringify(locations));
                  getLocalStorage();
                }
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
