// Main app file for dynamic serverside functionality

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const apiRoutes = require('./routes/api-routes')

app.use(express.json())
app.use(express.static('public'))
app.use('/api/v1', apiRoutes)
app.use(require('./routes/static'))


app.listen(port, () => console.log(`Server is running http://localhost:${port}`))

