/*
Miles Nichols
milesn@iastate.edu
11/18/2024
*/

function fetchData() {
  fetch("http://localhost:8081/robots")
      .then(response => response.json())
      .then(myRobots => {
          loadRobots(myRobots);
      })
      .catch(err => console.log(err));
}

function loadRobots(myRobots) {
  const CardRobot = document.getElementById("col");
  CardRobot.innerHTML = "";
  for (let i = 0; i < myRobots.length; i++) {
      const name = myRobots[i].name;
      const description = myRobots[i].description;
      const price = myRobots[i].price;
      const url = myRobots[i].imageUrl;

      const AddCardRobot = document.createElement("div");
      AddCardRobot.classList.add("col");
      AddCardRobot.innerHTML = `
          <div class="card shadow-sm">
              <img src="${url}" class="card-img-top" alt="Robot image">
              <div class="card-body">
                  <p class="card-text">
                      <strong>${name}</strong>
                  </p>
                  <p>${description}</p>
                  <p>Price: $${price}</p>
              </div>
          </div>
      `;
      CardRobot.appendChild(AddCardRobot);
  }
}

function addRobot() {
  const newRobot = {
      id: parseInt(document.getElementById("addId").value),
      name: document.getElementById("addName").value,
      price: parseFloat(document.getElementById("addPrice").value),
      description: document.getElementById("addDescription").value,
      imageUrl: document.getElementById("addImageUrl").value,
  };

  fetch("http://localhost:8081/robot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRobot),
  })
      .then(response => {
          if (!response.ok) {
              return response.json().then(err => {
                  throw new Error(err.error || "Error adding robot");
              });
          }
          return response.json();
      })
      .then(() => {
          fetchData();
      })
      .catch(err => {
          console.error(err);
      });
}

function deleteOneRobot() {
  const id = document.getElementById("deleteId").value;
  fetch(`http://localhost:8081/robot/${id}`, {
      method: "DELETE",
  })
      .then(response => {
          if (!response.ok) {
              return response.json().then(err => {
                  throw new Error(err.message || "Failed to delete robot");
              });
          }
          return response.json();
      })
      .then(() => {
          fetchData();
      })
      .catch(err => {
          console.error(err);
      });
}

function updateOneRobot() {
  const id = document.getElementById("updateId").value;
  const updatedRobot = {
      name: document.getElementById("updateName").value,
      price: parseFloat(document.getElementById("updatePrice").value),
      description: document.getElementById("updateDescription").value,
      imageUrl: document.getElementById("updateImageUrl").value,
  };

  fetch(`http://localhost:8081/robot/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRobot),
  })
      .then(response => {
          if (!response.ok) {
              return response.json().then(err => {
                  throw new Error(err.message || "Failed to update robot");
              });
          }
          return response.json();
      })
      .then(() => {
          fetchData();
      })
      .catch(err => {
          console.error(err);
      });
}

function showOneRobot() {
  let id = document.getElementById("robotId").value;
  fetch(`http://localhost:8081/robot/${id}`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Robot not found");
          }
          return response.json();
      })
      .then(myFavoriteRobot => {
          loadOneRobot(myFavoriteRobot);
      })
      .catch(err => {
          document.getElementById("singleRobot").innerHTML = "Robot not found.";
      });

  function loadOneRobot(myFavoriteRobot) {
      let robotDiv = document.getElementById("singleRobot");
      robotDiv.innerHTML = `
          <div class="card" style="width: 18rem;">
              <img src="${myFavoriteRobot.imageUrl}" class="card-img-top" alt="${myFavoriteRobot.name}">
              <div class="card-body">
                  <h5 class="card-title">${myFavoriteRobot.name}</h5>
                  <p class="card-text">${myFavoriteRobot.description || "No description available."}</p>
                  <p>Price: $${myFavoriteRobot.price}</p>
              </div>
          </div>
      `;
  }
}

fetchData();
