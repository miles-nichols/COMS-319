// Miles Nichols
// Sep 25, 2024
// milesn@iastate.edu

function appendData(data, inputMovieName) {
  var CardMovie = document.getElementById("col");
  CardMovie.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i].title.toLowerCase() === inputMovieName.toLowerCase()) {
      let title = data[i].title;
      let year = data[i].year;
      let url = data[i].url;
      console.log(title);

      // construct the HTML element
      let AddCardMovie = document.createElement("div");
      AddCardMovie.classList.add("col"); // Add Bootstrap class to the column
      AddCardMovie.innerHTML = `
    <div class="card shadow-sm">
    <img src=${url} class="card-img-top" alt="${title}"></img>
    <div class="card-body">
    <p class="card-text"> <strong>${title}</strong>, ${year}</p>
    </div>
    </div>
    `;
      CardMovie.appendChild(AddCardMovie);
    } // end of if
  } // end of for
}

function myFetch(inputMovieName) {
    fetch("./movies.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        appendData(data.movies, inputMovieName); // Pass inputMovieName to appendData
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  }

  const form = document.getElementById("my_form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    // Get the value from the input field when form is submitted
    const inputMovieName = document.getElementById("selectedMovie").value;
    
    // Call fetch with the movie name
    myFetch(inputMovieName);
  });
