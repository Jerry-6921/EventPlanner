document.addEventListener('DOMContentLoaded', function () {
    const eventTitleInput = document.getElementById('eventTitle');
    const eventDateInput = document.getElementById('eventDate');
    const eventTimeInput = document.getElementById('eventTime');
    const eventDescriptionInput = document.getElementById('eventDescription');
    const addEventButton = document.getElementById('addEventButton');
    const eventList = document.getElementById('eventList');
    const calendar = document.getElementById('calendar');

    let events = [];

    function renderCalendar() {
        calendar.innerHTML = '';

        // Generate calendar days
        for (let i = 1; i <= 31; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            const eventForDay = events.find(event => new Date(event.date).getDate() === i);
            if (eventForDay) {
                dayDiv.classList.add('event');
            }
            calendar.appendChild(dayDiv);
        }
    }

    function renderEventList() {
        eventList.innerHTML = '';
        events.forEach((event, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${event.title}</strong> <br>
                ${event.date} at ${event.time} <br>
                ${event.description}
                <button onclick="deleteEvent(${index})">Delete</button>
            `;
            eventList.appendChild(li);
        });
    }

    addEventButton.addEventListener('click', function () {
        const eventTitle = eventTitleInput.value;
        const eventDate = eventDateInput.value;
        const eventTime = eventTimeInput.value;
        const eventDescription = eventDescriptionInput.value;

        if (eventTitle && eventDate && eventTime && eventDescription) {
            const event = {
                title: eventTitle,
                date: eventDate,
                time: eventTime,
                description: eventDescription
            };

            events.push(event);
            renderCalendar();
            renderEventList();

            eventTitleInput.value = '';
            eventDateInput.value = '';
            eventTimeInput.value = '';
            eventDescriptionInput.value = '';
        } else {
            alert('Please fill out all fields');
        }
    });

    window.deleteEvent = function (index) {
        events.splice(index, 1);
        renderCalendar();
        renderEventList();
    };

    renderCalendar();
});
