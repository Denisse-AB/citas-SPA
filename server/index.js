const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

// middleware
app.use(bodyParser.json()); // or express.json()
app.use(cors());

// redirect to route folder
const posts = require('./routes/post');
app.use('/post', posts);

// Handle production
if (process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.js'));
}

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is running on port ${port}.`))