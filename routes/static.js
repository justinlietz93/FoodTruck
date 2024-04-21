// Static routes for the website

const router = require('express').Router()
const path = require('path')
const root = path.join(__dirname,'..', 'public')

// Route for home page
router.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})

// Route for menu page
router.get('/menu', (_, response) => {
    response.sendFile('menu.html', { root });
});

// Route for admin page
router.get('/admin', (_, response) => {
    response.sendFile('admin.html', { root });
});

// Route for contact page
router.get('/contact', (_, response) => {
    response.sendFile('contact.html', { root });
});

router.all('*', (request, response) => {
    response.status(404).sendFile('404.html', { root })
})

module.exports = router