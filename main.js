document.addEventListener("DOMContentLoaded", function () {
    const habitInput = document.getElementById("habitInput");
    const habitTable = document.getElementById("habitTable");
    const quoteEl = document.getElementById("quote");

    const quotes = [
        "Start where you are. Use what you have. Do what you can.",
        "Success is the sum of small efforts repeated daily.",
        "Discipline is choosing between what you want now and what you want most.",
        "A little progress each day adds up to big results.",
        "Focus on being productive, not busy.",
        "You don't need to be perfect, just consistent.",
        "Small steps every day lead to lasting change."
    ];
    const today = new Date().getDay(); // 0 = Sunday
    quoteEl.textContent = quotes[today % quotes.length];

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let habits = JSON.parse(localStorage.getItem("habits")) || [];

    function renderTable() {
        let html = "<table><tr><th>Habit</th>" + days.map(d => `<th>${d}</th>`).join("") + "</tr>";
        habits.forEach((habit, index) => {
            html += "<tr><td>" + habit.name + "</td>";
            days.forEach((_, dayIndex) => {
                const checked = habit.days[dayIndex] ? "checked" : "";
                html += `<td><input type="checkbox" data-habit="${index}" data-day="${dayIndex}" ${checked}></td>`;
            });
            html += "</tr>";
        });
        html += "</table>";
        habitTable.innerHTML = html;
        document.querySelectorAll("input[type=checkbox]").forEach(checkbox => {
            checkbox.addEventListener("change", function () {
                const habitIdx = this.dataset.habit;
                const dayIdx = this.dataset.day;
                habits[habitIdx].days[dayIdx] = this.checked;
                localStorage.setItem("habits", JSON.stringify(habits));
                renderChart();
            });
        });
        renderChart();
    }

    function addHabit() {
        const name = habitInput.value.trim();
        if (!name) return;
        habits.push({ name, days: Array(7).fill(false) });
        localStorage.setItem("habits", JSON.stringify(habits));
        habitInput.value = "";
        renderTable();
    }

    window.addHabit = addHabit;
    renderTable();

    function renderChart() {
        const totalPerDay = Array(7).fill(0);
        habits.forEach(habit => {
            habit.days.forEach((checked, idx) => {
                if (checked) totalPerDay[idx]++;
            });
        });
        const ctx = document.getElementById("chart").getContext("2d");
        if (window.barChart) window.barChart.destroy();
        window.barChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: days,
                datasets: [{
                    label: "Habits done",
                    data: totalPerDay,
                    backgroundColor: "#4caf50"
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
});
