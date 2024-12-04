const app = require('./app')
require('dotenv').config();

const port = process.env.port

app.listen(port, () => {
   console.log("==================server running on port====================", port)
})