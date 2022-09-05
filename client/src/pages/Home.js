import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Posts = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:4000/posts', {
            title
        })

        setTitle('');
    };

    return (
        <main className='posts-main'>

            <h1 className='posts-title'>Create Posts</h1>

            <Form className='posts-form' onSubmit={onSubmit}>
                <Form.Group className="mb-3 col-md-5" controlId="formBasicEmail">

                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title"
                        value={title} onChange={e => setTitle(e.target.value)} />

                    <Form.Text className="text-muted m-2">
                        title of the block, shown publicly
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className='posts-title-submit'>
                    Submit
                </Button>
            </Form>
        </main>
    )
}

export default Posts