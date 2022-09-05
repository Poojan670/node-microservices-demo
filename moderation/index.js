const express = require('express'),
    bodyParsere = require('body-parser'),
    axios = require('axios');

app = express();
app.use(bodyParsere.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postid: data.postId,
                status,
                content: data.content
            }
        })
    }

    res.send({});

})

app.listen(4003, () => {
    console.log("Listening on port : 4003")
})