const express = require('express');
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// redirect to route folder
const posts = require('./routes/post');
app.use('/post', posts);

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is running on port ${port}.`))