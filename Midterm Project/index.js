document.addEventListener("DOMContentLoaded", () => {
    const productSection = document.getElementById("product-cards");

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            data.featuredProducts.forEach(product => {
                const card = document.createElement("div");
                card.classList.add("col-md-4", "mb-4");

                card.innerHTML = `
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p><strong>Price:</strong> $${product.price}</p>
                            <a href="${product.link}" target="_blank" class="btn btn-primary">Buy Now</a>
                        </div>
                    </div>
                `;
                productSection.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching product data:", error));
});
