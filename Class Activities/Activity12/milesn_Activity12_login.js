function fetchUser() {
  document.getElementById("loginuser").innerHTML = `Authenticating...`;

  return new Promise((resolve, reject) => {
    fetch("./milesn_Activity12_login.json")
    .then(response => response.json())
    .then(data => {resolve(data)})
    .catch((error) => {console.log(error);});

  });
}

function login(users, userInput, passwordInput) {
    if(users.user === userInput && users.password === passwordInput){
        document.getElementById("loginuser").innerHTML = "user and password correct!";

    }
    else{
        document.getElementById("loginuser").innerHTML = "user and password incorrect!";
    }
}

async function useAdmin(userInput, passwordInput) {
    const users = await fetchUser();
    login(users, userInput, passwordInput);
}

document.getElementById("loginButton").addEventListener("click", (event) => {
  event.preventDefault();
  const userInput = document.getElementById("userInput").value;
  const passwordInput = document.getElementById("passwordInput").value;
  useAdmin(userInput, passwordInput);
});
