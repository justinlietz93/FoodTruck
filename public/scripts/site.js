// Javascript file for website functionality

(async () => {


    const getMenu = async () => {
        const menu = await fetch('/api/v1/menu');
        const menuData = await menu.json();
        console.log(menuData);
    }

    const getEvents = async () => {
        const events = await fetch('/api/v1/events');
        const eventData = await events.json();
        console.log(eventData);
    }
    
})();