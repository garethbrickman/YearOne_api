$(document).ready(function () {
  document.querySelector("#searchFilm").addEventListener('submit', (e) => {
    e.preventDefault(); // prevents document refreshing after search submit
    $(".search-result").empty(); // empty the div of previous content
    const formData = new FormData(e.target);
    let queryTitle = formData.get('searchTitle');
    console.log(queryTitle);
  });

   /*  // TODO: hide API key in env var, pagination of results
    const apiKey = "169cd3b2&s";
    $.ajax({
      type: "GET",
      url: "http://www.omdbapi.com/",
      data: "apikey=" + apiKey + "&type=movie" + "&s=" + queryTitle,
      })
      .done(function (data) {
          console.log( "Sample of data:", data );
          const resultTitles = data.Search.map(x => x.Title); // Extract just the film titles from the response
          return resultTitles; */
/*           resultTitles.forEach(function (title) {
            const p = document.createElement("P");
            const t = document.createTextNode(title);
            p.appendChild(t);
            document.querySelector(".search-result").appendChild(p); */

  document.querySelector(".btn-post").addEventListener("click", function () {
      $.post("http://localhost:3000/api/films",
      {
        "title": "Spiderman",
        "thumbs_up": 0,
        "thumbs_down": 0
      },
      function (status) {
        console.log(status);
      }
    );
  });

  document.querySelector(".btn-get").addEventListener("click", function () {
    $.getJSON('http://localhost:3000/api/films', function (data) {
      console.log(data);
      document.querySelector(".get").innerHTML = data;
    });
  });
});
