document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");

  const quotes = [
    "Start where you are. Use what you have. Do what you can.",
    "Success is the sum of small efforts repeated daily.",
    "Discipline is choosing between what you want now and what you want most.",
    "A little progress each day adds up to big results.",
    "Focus on being productive, not busy.",
    "You don’t need to be perfect, just consistent.",
    "Small steps every day lead to lasting change."
  ];

  const today = new Date().getDay(); // 0 = Sunday, 6 = Saturday
  const quoteText = quotes[today % quotes.length];

  app.innerHTML = `
    <div class="card">
      <p class="motivation">${quoteText}</p>
      <h1>Habit Tracker</h1>
      <input type="text" id="taskInput" placeholder="New habit..." />
      <button onclick="addTask()">Add</button>
      <ul id="taskList"></ul>
    </div>
  `;

  window.addTask = function () {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.textContent = taskText;
    document.getElementById("taskList").appendChild(li);
    input.value = "";
  };
});

