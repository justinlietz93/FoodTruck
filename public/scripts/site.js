// Javascript file for website functionality

(async () => {

    /////////////////////////////      HELPER FUNCTIONS        //////////////////////////////

    /////////////////////////////      MENU        //////////////////////////////

    // Fetches menu items from the database
    const getMenu = async () => {
        const menu = await fetch('/api/v1/menu')
        const menuData = await menu.json()

        return await menuData
    }
    
    // Updates a menu item in the database
    const updateMenuItem = async (id, menuData) => {
        try {
            const response = await fetch(`/api/v1/menu/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(menuData)
            })
            const responseData = await response.json()
            return responseData
        } catch (error) {
            console.error('Error updating menu:', error)
        }
    }

    // Deletes a menu item from the database
    const deleteMenuItem = async (id) => {
        const response = await fetch(`/api/v1/menu/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }})

        return await response.json()
    }

    // Adds a menu item to the database
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

    // Handles add menu item data handoff from the form to the add menu item function (probably can be done better)
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

    // Handles add event data handoff from the form to the add event function (probably can be done better)
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

    // Adds an event to the database
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

    // Fetches events from the database
    const getEvents = async () => {
        const events = await fetch('/api/v1/events')
        const eventData = await events.json()

        return await eventData
    }

    // Updates an event in the database
    const updateEvent = async (id, eventData) => {
        try {
            const response = await fetch(`/api/v1/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            })
            const responseData = await response.json()
            return responseData
        } catch (error) {
            console.error('Error updating event:', error)
        }
    }

    // Deletes an event from the database
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
                // Create a div to hold each menu item
                const menuItemCard = document.createElement('div')
                menuItemCard.classList.add('menu-item-card')
    
                // Create elements for name, description, and price
                const itemName = document.createElement('h1')
                itemName.textContent = item.name
    
                const itemDescription = document.createElement('p')
                itemDescription.textContent = item.description
    
                const itemPrice = document.createElement('p')
                itemPrice.textContent = `Price: $${item.price}`
    
                // Append name, description, and price elements to the menu item card
                menuItemCard.appendChild(itemName)
                menuItemCard.appendChild(itemDescription)
                menuItemCard.appendChild(itemPrice)
    
                // Append the menu item card to the container
                container.appendChild(menuItemCard)
            })
        } catch (error) {
            console.error('Error fetching menu items:', error)
        }
    }

    await displayMenu()

    /////////////////////////////      EVENTS        //////////////////////////////
    
    // Toggles event details visibility, when clicked the card becomes visible
    const toggleEventInfo = (eventId) => {
        const eventDetails = document.getElementById(eventId)
        eventDetails.classList.toggle('hidden')
    }
    
    // Displays events on the site (home page)
    const displayEvents = async () => {
        const eventsContainer = document.getElementById('events-container')
    
        // Fetches events data and sorts by date
        try {
            const eventsData = await getEvents()
    
            eventsData.sort((a, b) => new Date(a.dates) - new Date(b.dates))

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
    
            // Populates rows with input fields containing menu item data
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

            // Event listener for updating menu item data
            const updateButton = row.querySelector(`#update-button-${item._id}`)
            updateButton.addEventListener('click', async () => {
                const updatedName = row.querySelector('td:nth-child(1) input').value
                const updatedDescription = row.querySelector('td:nth-child(2) input').value
                const updatedPrice = row.querySelector('td:nth-child(3) input').value

                // Assembles menu item data to be updated
                const updatedMenuItemData = {
                    name: updatedName,
                    description: updatedDescription,
                    price: updatedPrice
                }

                // Updates menu item data
                await updateMenuItem(item._id, updatedMenuItemData)
                // Used to refresh the page after updating
                window.location.reload()
            })

            const deleteButton = row.querySelector(`#delete-button-${item._id}`)
            // Event listener for deleting menu item
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

    // Displays events in the admin panel for updating, adding, and deleting
    const displayAdminEvents = async () => {
        try {
            const events = await getEvents()
            const eventsTableBody = document.querySelector('#event-table tbody')

            events.sort((a, b) => new Date(a.dates) - new Date(b.dates))
            
            // Populates row with input fields containing event data
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

                // Event listener for updating event data
                updateButton.addEventListener('click', async () => {
                    const updatedName = row.querySelector('td:nth-child(1) input').value
                    const updatedLocation = row.querySelector('td:nth-child(2) input').value
                    const updatedDate = row.querySelector('td:nth-child(3) input').value
                    const updatedHours = row.querySelector('td:nth-child(4) input').value
    
                    // Assembles event data to be updated
                    const updatedEventData = {
                        name: updatedName,
                        location: updatedLocation,
                        dates: updatedDate,
                        hours: updatedHours
                    }
    
                    // Updates event data
                    await updateEvent(event._id, updatedEventData)
                    // Used to refresh the page after updating
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
    

    /////////////////////////////      DYNAMIC SITE BEHAVIOR        //////////////////////////////

    // Global nav bar behavior
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header')
        const nav = document.querySelector('nav')
    
        // When the user scrolls past the header, the nav bar becomes fixed to the top of the page
        if (window.scrollY > header.offsetHeight - 100) {
            nav.style.position = 'fixed'
            nav.style.top = '0'
            nav.style.width = '90%'
            nav.style.transition = 'margin-top 0.3s ease'
            nav.style.margin = '0 5%'
            nav.style.marginTop = '20px'
            header.style.marginBottom = `${nav.offsetHeight}px`
        } else {
            nav.style.width = '100%'
            nav.style.position = 'static'
            nav.style.transition = 'margin-top 0.3s ease'
            header.style.marginBottom = '0'
            nav.style.margin = '0'
            nav.style.marginRight = '20px'
        }
    })


})()