const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    { randomBytes } = require('crypto'),
    axios = require('axios'),
    app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};


app.get('/posts', (req, res) => {
    res.send(posts);

})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const title = req.body.title;
    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: "PostCreated",
        data: {
            id, title
        }
    })
    res.status(201).send(posts[id]);

})

app.post('/events', (req, res) => {
    console.log("Events received", req.body.type)
    res.send({});
})

app.listen(4000, () => {
    console.log("Listening on port 4000");
})