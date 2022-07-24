var cityFind = document.getElementById("city-find");
var repoList = document.getElementById("list");
var formatType = "";

$(".btn").on("click", function (event) {
  event.preventDefault();
  //   console.log(event.target.id);
  //   for (let i = 0; i < hours.length; i++) {
  //     if (hours[i].btn === event.target.id) {
  //       const value = document.getElementById(hours[i].el).value;
  //       hours[i].text = value;
  //     }
  //   }
  console.log("beef");
  getApi();
  //   https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
});

var getSearchProps = function (format) {
  const input = document.getElementById("input");
  console.log(input.value);
  const q = input.value;
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    format +
    "/?q=" +
    encodeURIComponent(q) +
    "&fo=json";
  console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // displayRepos(data.items, language);
        console.log("data", data.results);
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
