  function openDayPlanner() {
    window.open("dayplanner.html", "_blank");
  }

  let current = new Date();           // Shown date
  const today = new Date();           // Fixed today

  const monthYearEl = document.getElementById("monthYear");
  const calendarDaysEl = document.getElementById("calendarDays");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  function getKey(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  function renderCalendar(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    monthYearEl.textContent = `${monthNames[month]} ${year}`;
    calendarDaysEl.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "empty";
      calendarDaysEl.appendChild(emptyCell);
    }

    for (let day = 1; day <= numDays; day++) {
      const dayCell = document.createElement("div");
      const cellDate = new Date(year, month, day);
      const taskKey = getKey(cellDate);
      const savedTask = localStorage.getItem(taskKey);

      dayCell.textContent = day;

      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayCell.classList.add("today");
      }

      if (savedTask) {
        const taskLabel = document.createElement("div");
        taskLabel.style.fontSize = "10px";
        taskLabel.style.color = "#d32f2f";
        taskLabel.textContent = "📌";
        taskLabel.title = savedTask;
        dayCell.appendChild(taskLabel);
      }

      dayCell.style.cursor = "pointer";
      dayCell.onclick = () => {
        let msg = savedTask
          ? `Task for ${day}/${month + 1}/${year}:\n"${savedTask}"\n\nEnter a new task to update, or leave blank to delete:`
          : `Enter a task for ${day}/${month + 1}/${year}:`;
        const newTask = prompt(msg, savedTask || "");
        if (newTask !== null) {
          if (newTask.trim() === "") {
            localStorage.removeItem(taskKey);
          } else {
            localStorage.setItem(taskKey, newTask.trim());
          }
          renderCalendar(current);
        }
      };

      calendarDaysEl.appendChild(dayCell);
    }
  }

  function changeMonth(offset) {
    current.setMonth(current.getMonth() + offset);
    renderCalendar(current);
  }

  function goToToday() {
    current = new Date(today);
    renderCalendar(current);
  }

  renderCalendar(current);

