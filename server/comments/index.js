const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    { randomBytes } = require('crypto'),
    axios = require('axios'),
    app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);

})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const content = req.body.content;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: "pending" });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-srv:4005/events', {
        type: "CommentsCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })
    res.status(201).send(comments);
})

app.post('/events', async (req, res) => {
    console.log("Events received", req.body.type)
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find((comment) => {
            return comment.id === id;
        });
        comment.status = status;
        await axios.post('http://event-srv:4005', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }
    res.send({});
})

app.listen(4001, () => {
    console.log('Listening on port 4001');
})