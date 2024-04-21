// Javascript file for website functionality

(async () => {

    /////////////////////////////      HELPER FUNCTIONS        //////////////////////////////

    /////////////////////////////      MENU        //////////////////////////////

    const getMenu = async () => {
        const menu = await fetch('/api/v1/menu');
        const menuData = await menu.json();
        console.log(menuData);

        return await menuData
    }

    const getMenuItem = async (id) => {
        const menu = await fetch(`/api/v1/menu/${id}`);
        const menuData = await menu.json();
        console.log(menuData);

        return await menuData
    }
    
    const updateMenu = async (id) => {
        const response = await fetch(`/api/v1/menu/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }})

        return await response.json()
        }
    
    const deleteMenuItem = async (id) => {
        const response = await fetch(`/api/v1/menu/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }})

        return await response.json()
    }


    /////////////////////////////      EVENTS        //////////////////////////////

    const getEvents = async () => {
        const events = await fetch('/api/v1/events');
        const eventData = await events.json();
        console.log(eventData);
    }

    const getEvent = async (id) => {
        const event = await fetch(`/api/v1/events/${id}`);
        const eventData = await event.json();
        console.log(eventData);
    }

    const updateEvent = async (id) => {
        const response = await fetch(`/api/v1/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }})

        return await response.json()
    }

    const deleteEvent = async (id) => {
        const response = await fetch(`/api/v1/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }})

        return await response.json()
    }

    /////////////////////////////      SITE FUNCTIONALITY        //////////////////////////////

    /////////////////////////////      MENU        //////////////////////////////

    const displayMenu = async () => {
        try {
            const menu = await getMenu()
            const container = document.getElementById('menu-container') // Get the menu container element
    
            container.innerHTML = '' // Clear existing menu items
    
            menu.forEach(item => {
                const menuItemDiv = document.createElement('div') // Create a div for each menu item
                menuItemDiv.classList.add('menu-item');
    
                const itemName = document.createElement('h2') // Create heading element for item name
                itemName.textContent = item.name;
    
                const itemDescription = document.createElement('p') // Create paragraph element for item description
                itemDescription.textContent = item.description;
    
                const itemPrice = document.createElement('p') // Create paragraph element for item price
                itemPrice.textContent = `Price: $${item.price}`
    
                // Append name, description, and price elements to the menu item div
                menuItemDiv.appendChild(itemName)
                menuItemDiv.appendChild(itemDescription)
                menuItemDiv.appendChild(itemPrice)
    
                container.appendChild(menuItemDiv) // Append the menu item div to the container
            });
        } catch (error) {
            console.error('Error fetching menu items:', error)
        }
    }

    displayMenu();

    /////////////////////////////      EVENTS        //////////////////////////////
    
    const toggleEventInfo = (eventId) => {
        const eventDetails = document.getElementById(eventId)
        eventDetails.classList.toggle('hidden')
    };
    
    const displayEvents = async () => {
        const eventsContainer = document.getElementById('events-container')
    
        try {
            const eventsResponse = await fetch('/api/v1/events')
            const eventsData = await eventsResponse.json()
    
            eventsData.forEach((event, index) => {
                const eventCard = document.createElement('div')
                eventCard.classList.add('event')
                eventCard.innerHTML = `<h3>${event.name}</h3>`
                eventCard.addEventListener('click', () => toggleEventInfo(`event${index}`))
    
                const eventDetails = document.createElement('div')
                eventDetails.classList.add('event-details', 'hidden')
                eventDetails.id = `event${index}`
                eventDetails.innerHTML = `
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Hours:</strong> ${event.hours}</p>
                `
    
                eventsContainer.appendChild(eventCard)
                eventsContainer.appendChild(eventDetails)
            })
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    };
    
    displayEvents();


})();