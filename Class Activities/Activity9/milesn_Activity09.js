// Miles Nichols
// Sep 25, 2024
// milesn@iastate.edu

function appendData(data) {
    let mainContainer = document.getElementById("myData1");

    let div = document.createElement("div");
    div.classList.add("col-sm-6", "col-md-4", "col-lg-3"); 

    div.innerHTML = `
    <div class="card mb-4" style="width: 100%;">
      <img src="${data.logo}" class="card-img-top" alt="${data.firstName} ${data.lastName}" width="100" />
      <div class="card-body">
        <h5 class="card-title">${data.firstName} ${data.lastName}</h5>
        <p class="card-text">
          <strong>Job:</strong> ${data.job} <br>
          <strong>Roll:</strong> ${data.roll}
        </p>
      </div>
    </div>`;
    
    mainContainer.appendChild(div);
}

function createWebpage(data){
    console.log("Starting the Webpage Creation");
}

function myFetch() {
    fetch("./persons.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            data.forEach(hero => {
                appendData(hero); 
            });
        })
        .catch(function (error) {
            console.log("Error:" + error);
        });
}

myFetch();
