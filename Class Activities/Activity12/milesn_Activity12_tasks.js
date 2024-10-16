document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnTask1").addEventListener("click", 
    async () => {
        const result = await simulateAsyncTask(2000, "Task 1 completed");
        displayResult(result);
  });
  document.getElementById("btnTask2").addEventListener("click", 
    async () => {
        const result = await simulateAsyncTask(3000, "Task 2 completed");
        displayResult(result);

  });
  document.getElementById("btnTask3").addEventListener("click", 
    async () => {
        const result = await simulateAsyncTask(4000, "Task 3 completed");
        displayResult(result);
  });

    function simulateAsyncTask(delay, result) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(result);
                reject("Error in simulateAsyncTask");
            }, delay);
        });
      }

  function displayResult(message) {
    const taskResultsDiv = document.getElementById("taskResults");
    taskResultsDiv.innerHTML += `<p>${message}</p>`;
  }
});

