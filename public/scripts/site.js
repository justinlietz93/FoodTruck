// Javascript file for website functionality

(async () => {

    /////////////////////////////      HELPER FUNCTIONS        //////////////////////////////

    /////////////////////////////      MENU        //////////////////////////////

    const getMenu = async () => {
        const menu = await fetch('/api/v1/menu')
        const menuData = await menu.json()
        console.log(menuData)

        return await menuData
    }

    const getMenuItem = async (id) => {
        const menu = await fetch(`/api/v1/menu/${id}`)
        const menuData = await menu.json()
        console.log(menuData)

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

    const addMenuItem = async () => {
        const menu = await fetch('/api/v1/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }})

        const menuData = await menu.json()

        return await menuData
    }


    /////////////////////////////      EVENTS        //////////////////////////////

    const addEvent = async (eventData) => {
        try {
            const events = await fetch('/api/v1/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            })
            const responseData = await events.json()
    
            return responseData
        } catch (error) {
            console.error('Error adding event:', error)
        }
    }

    const getEvents = async () => {
        const events = await fetch('/api/v1/events')
        const eventData = await events.json()
        console.log(eventData)

        return await eventData
    }

    const getEvent = async (id) => {
        const event = await fetch(`/api/v1/events/${id}`)
        const eventData = await event.json()
        console.log(eventData)

        return await eventData
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
                menuItemDiv.classList.add('menu-item')
    
                const itemName = document.createElement('h2') // Create heading element for item name
                itemName.textContent = item.name
    
                const itemDescription = document.createElement('p') // Create paragraph element for item description
                itemDescription.textContent = item.description
    
                const itemPrice = document.createElement('p') // Create paragraph element for item price
                itemPrice.textContent = `Price: $${item.price}`
    
                // Append name, description, and price elements to the menu item div
                menuItemDiv.appendChild(itemName)
                menuItemDiv.appendChild(itemDescription)
                menuItemDiv.appendChild(itemPrice)
    
                container.appendChild(menuItemDiv) // Append the menu item div to the container
            })
        } catch (error) {
            console.error('Error fetching menu items:', error)
        }
    }

    displayMenu()

    /////////////////////////////      EVENTS        //////////////////////////////
    
    const toggleEventInfo = (eventId) => {
        const eventDetails = document.getElementById(eventId)
        eventDetails.classList.toggle('hidden')
    }
    
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
                    <p><strong>Date:</strong> ${event.dates}</p>
                    <p><strong>Hours:</strong> ${event.hours}</p>
                `
    
                eventsContainer.appendChild(eventCard)
                eventsContainer.appendChild(eventDetails)
            })
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    }
    
    displayEvents()

    /////////////////////////////      ADMIN FUNCTIONALITY        //////////////////////////////

    /////////////////////////////      MENU        //////////////////////////////

    const displayAdminMenu = async () => {
        try {
            const menu = await getMenu()
            const menuTableBody = document.querySelector('#menu-table tbody')
    
            menuTableBody.innerHTML = '' // Clear existing menu items
    
            menu.forEach(item => {
                const row = document.createElement('tr')
                row.innerHTML = `
                    <td><input type="text" value="${item.name}"></td>
                    <td><input type="text" value="${item.description}"></td>
                    <td><input type="text" value="${item.price}"></td>
                    <td>
                        <button onclick="await updateMenu(${item.id})">Update</button>
                        <button onclick="await deleteMenuItem(${item.id})">Delete</button>
                    </td>
                `
                menuTableBody.appendChild(row)
            })
    
            // Add input sections for the last row
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
                <td><input type="text" id="new-item-name"></td>
                <td><input type="text" id="new-item-description"></td>
                <td><input type="text" id="new-item-price"></td>
                <td>
                    <button id="add_button" onclick="addItem()">Add</button>
                </td>
            `
            menuTableBody.appendChild(newRow)
        } catch (error) {
            console.error('Error fetching menu items:', error)
        }
    }
    
    displayAdminMenu()

    /////////////////////////////      EVENTS        //////////////////////////////

    const displayAdminEvents = async () => {
        try {
            const events = await getEvents()
            const eventsTableBody = document.querySelector('#event-table tbody')
    
            eventsTableBody.innerHTML = '' // Clear existing events
    
            events.forEach(event => {
                const row = document.createElement('tr')
                row.innerHTML = `
                    <td><input type="text" value="${event.name}"></td>
                    <td><input type="text" value="${event.location}"></td>
                    <td><input type="text" value="${event.dates}"></td>
                    <td><input type="text" value="${event.hours}"></td>
                    <td>
                        <button id="update-button-${event.id}">Update</button>
                        <button id="delete-button-${event.id}">Delete</button>
                    </td>
                `
                eventsTableBody.appendChild(row)
    
                // Attach event listeners to the buttons
                const updateButton = row.querySelector(`#update-button-${event.id}`)
                updateButton.addEventListener('click', () => updateEvent(event.id))
    
                const deleteButton = row.querySelector(`#delete-button-${event.id}`)
                deleteButton.addEventListener('click', () => deleteEvent(event.id))
            })
    
            // Add input sections for the last row
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
                <td><input type="text" id="new-event-name"></td>
                <td><input type="text" id="new-event-location"></td>
                <td><input type="date" id="new-event-date"></td>
                <td><input type="text" id="new-event-hours"></td>
                <td>
                    <button id="add_button">Add</button>
                </td>
            `
            eventsTableBody.appendChild(newRow)
    
            // Attach event listener to the add button
            const addButton = newRow.querySelector('#add_button')
            addButton.addEventListener('click', async () => {
                const newName = document.getElementById('new-event-name').value
                const newLocation = document.getElementById('new-event-location').value
                const newDate = document.getElementById('new-event-date').value
                const newHours = document.getElementById('new-event-hours').value

                const eventData = {
                    name: newName,
                    location: newLocation,
                    dates: newDate,
                    hours: newHours
                }

            await addEvent(eventData)
            })
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    }

    displayAdminEvents()

})()