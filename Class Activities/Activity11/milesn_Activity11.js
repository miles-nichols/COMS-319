// Miles Nichols
// Sep 25, 2024
// milesn@iastate.edu

fetch('./movies.json')
    .then(response => response.json())
    .then(data => {
        window.moviesData = data.movies;
    })
    .catch(err => console.log("Error: " + err));

function showCardsSortedByPriceLowHigh() {
    loadMovies(window.moviesData, 1);
}

function showCardsSortedByPriceHighLow() {
    loadMovies(window.moviesData, 2);
}

function loadMovies(myMovies, n) {
    const arrayMovies = myMovies.slice();
    let sortedMovies = [];

    if (n === 1) {
        sortedMovies = arrayMovies.sort((p1, p2) => (p1.price > p2.price) ? 1 : (p1.price < p2.price) ? -1 : 0);
    } else if (n === 2) {
        sortedMovies = arrayMovies.sort((p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);
    } else if (n === 3) {
        const inputDescription = document.getElementById("descriptionInput").value;
        sortedMovies = arrayMovies.filter(movie => movie.description.includes(inputDescription));
    }

    console.log("Sorted Movies:", sortedMovies);

    var CardMovie = document.getElementById("col");
    CardMovie.innerHTML = "";

    for (var i = 0; i < sortedMovies.length; i++) {
        let title = sortedMovies[i].title;
        let year = sortedMovies[i].year;
        let url = sortedMovies[i].url;
        let price = sortedMovies[i].price;

        let AddCardMovie = document.createElement("div");
        AddCardMovie.classList.add("col");
        AddCardMovie.innerHTML = `
        <div class="card shadow-sm" onclick="changeBackground(this)">
            <img src="${url}" class="card-img-top" alt="${title}">
            <div class="card-body">
                <p class="card-text"><strong>${title}</strong>, ${year}, $${price}</p>
            </div>
        </div>
        `;
        CardMovie.appendChild(AddCardMovie);
    }
}

function showCardsContainingDescriptionA() {
    document.getElementById('inputField').style.display = 'block';
}

function showCardsContainingDescriptionB() {
    loadMovies(window.moviesData, 3);
    document.getElementById('inputField').style.display = 'none';
}

function changeBackground(card) {
    card.style.backgroundColor = "#f0f8ff";
}
