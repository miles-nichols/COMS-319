document.addEventListener("DOMContentLoaded", () => {
    const newsSection = document.getElementById("news-articles");

    fetch("news.json")
        .then(response => response.json())
        .then(data => {
            data.articles.forEach(article => {
                const card = document.createElement("div");
                card.classList.add("col-md-4", "mb-4");

                card.innerHTML = `
                    <div class="card">
                        <img src="${article.image}" class="card-img-top" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.description}</p>
                            <a href="${article.link}" target="_blank" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                `;
                // Append the card to the news section
                newsSection.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching news data:", error));
});
