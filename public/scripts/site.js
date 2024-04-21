// Javascript file for website functionality

(async () => {

    /////////////////////////////      HELPER FUNCTIONS        //////////////////////////////

    /////////////////////////////      MENU        //////////////////////////////

    const getMenu = async () => {
        const menu = await fetch('/api/v1/menu')
        const menuData = await menu.json()

        return await menuData
    }

    const getMenuItem = async (id) => {
        const menu = await fetch(`/api/v1/menu/${id}`)
        const menuData = await menu.json()

        return await menuData
    }
    
    const updateMenuItem = async (id, menuData) => {
        try {
            const response = await fetch(`/api/v1/menu/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(menuData)
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Error updating menu:', error);
        }
    }

    
    const deleteMenuItem = async (id) => {
        const response = await fetch(`/api/v1/menu/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }})

        return await response.json()
    }

    const addMenuItem = async (menuData) => {
        try {
            const items = await fetch('/api/v1/menu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(menuData)
            })
            const responseData = await items.json()
    
            return responseData
        } catch (error) {
            console.error('Error adding event:', error)
        }
    }

    const handleAddMenuItem = async () => {
        const newName = document.getElementById('new-item-name').value
        const newDescription = document.getElementById('new-item-description').value
        const newPrice = document.getElementById('new-item-price').value
    
        const menuItemData = {
            name: newName,
            description: newDescription,
            price: newPrice
        }
    
        try {
            await addMenuItem(menuItemData)
            window.location.reload()
            
        } catch (error) {
            console.error('Error adding menu item:', error)
        }
    }

    /////////////////////////////      EVENTS        //////////////////////////////

    const handleAddEvent = async () => {
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
    
        try {
            await addEvent(eventData)
            window.location.reload()

        } catch (error) {
            console.error('Error adding event:', error)
        }
    }

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

        return await eventData
    }

    const getEvent = async (id) => {
        const event = await fetch(`/api/v1/events/${id}`)
        const eventData = await event.json()

        return await eventData
    }

    const updateEvent = async (id, eventData) => {
        try {
            const response = await fetch(`/api/v1/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Error updating event:', error);
        }
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
            const container = document.getElementById('menu-container')
    
            menu.forEach(item => {
                const menuItemDiv = document.createElement('div')
                menuItemDiv.classList.add('menu-item')
    
                const itemName = document.createElement('h2')
                itemName.textContent = item.name
    
                const itemDescription = document.createElement('p')
                itemDescription.textContent = item.description
    
                const itemPrice = document.createElement('p')
                itemPrice.textContent = `Price: $${item.price}`
    
                // Append name, description, and price elements to the menu item div
                menuItemDiv.appendChild(itemName)
                menuItemDiv.appendChild(itemDescription)
                menuItemDiv.appendChild(itemPrice)
    
                container.appendChild(menuItemDiv)
            })
        } catch (error) {
            console.error('Error fetching menu items:', error)
        }
    }

    await displayMenu()

    /////////////////////////////      EVENTS        //////////////////////////////
    
    const toggleEventInfo = (eventId) => {
        const eventDetails = document.getElementById(eventId)
        eventDetails.classList.toggle('hidden')
    }
    
    const displayEvents = async () => {
        const eventsContainer = document.getElementById('events-container')
    
        try {
            const eventsData = await getEvents()
    
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
    
    await displayEvents()

    /////////////////////////////      ADMIN FUNCTIONALITY        //////////////////////////////

    /////////////////////////////      MENU        //////////////////////////////

    const displayAdminMenu = async () => {
        try {
            const menu = await getMenu()
            const menuTableBody = document.querySelector('#menu-table tbody')
    
            menu.forEach(item => {
                const row = document.createElement('tr')
                row.innerHTML = `
                    <td><input type="text" value="${item.name}"></td>
                    <td><input type="text" value="${item.description}"></td>
                    <td><input type="text" value="${item.price}"></td>
                    <td>
                        <button id="update-button-${item._id}">Update</button>
                        <button id="delete-button-${item._id}">Delete</button>
                    </td>
                `
            menuTableBody.appendChild(row)

            const updateButton = row.querySelector(`#update-button-${item._id}`)
            updateButton.addEventListener('click', async () => {
                const updatedName = row.querySelector('td:nth-child(1) input').value
                const updatedDescription = row.querySelector('td:nth-child(2) input').value
                const updatedPrice = row.querySelector('td:nth-child(3) input').value

                const updatedMenuItemData = {
                    name: updatedName,
                    description: updatedDescription,
                    price: updatedPrice
                }

                await updateMenuItem(item._id, updatedMenuItemData)
                window.location.reload()
            })

            const deleteButton = row.querySelector(`#delete-button-${item._id}`)
            deleteButton.addEventListener('click', async () => {
                await deleteMenuItem(item._id)
                window.location.reload()
            })
      
            })

            // Add input sections for the last row
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
                <td><input type="text" id="new-item-name"></td>
                <td><input type="text" id="new-item-description"></td>
                <td><input type="text" id="new-item-price"></td>
                <td>
                    <button id="add_button">Add</button>
                </td>
            `
            menuTableBody.appendChild(newRow)
    
            // Attach event listener to the add button
            const addButton = newRow.querySelector('#add_button')
            addButton.addEventListener('click', handleAddMenuItem)
        
        } catch (error) {
            console.error('Error fetching menu items:', error)
        }
    }
    
    await displayAdminMenu()

    /////////////////////////////      EVENTS        //////////////////////////////

    const displayAdminEvents = async () => {
        try {
            const events = await getEvents()
            const eventsTableBody = document.querySelector('#event-table tbody')
    
            events.forEach(event => {
                const row = document.createElement('tr')
                row.innerHTML = `
                    <td><input type="text" value="${event.name}"></td>
                    <td><input type="text" value="${event.location}"></td>
                    <td><input type="text" value="${event.dates}"></td>
                    <td><input type="text" value="${event.hours}"></td>
                    <td>
                        <button id="update-button-${event._id}">Update</button>
                        <button id="delete-button-${event._id}">Delete</button>
                    </td>
                `
                eventsTableBody.appendChild(row)
                
                const updateButton = row.querySelector(`#update-button-${event._id}`)
                updateButton.addEventListener('click', async () => {
                    const updatedName = row.querySelector('td:nth-child(1) input').value;
                    const updatedLocation = row.querySelector('td:nth-child(2) input').value;
                    const updatedDate = row.querySelector('td:nth-child(3) input').value;
                    const updatedHours = row.querySelector('td:nth-child(4) input').value;
    
                    const updatedEventData = {
                        name: updatedName,
                        location: updatedLocation,
                        dates: updatedDate,
                        hours: updatedHours
                    }
    
                    await updateEvent(event._id, updatedEventData)
                    window.location.reload()
                })

                const deleteButton = row.querySelector(`#delete-button-${event._id}`)
                deleteButton.addEventListener('click', async () => {
                    await deleteEvent(event._id)
                    window.location.reload()
                })
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
            addButton.addEventListener('click', handleAddEvent)
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    }

    await displayAdminEvents()

})()