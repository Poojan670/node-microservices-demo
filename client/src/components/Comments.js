import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Comments = ({ postId }) => {
    const [content, setContent] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        });

        setContent('');
    };

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Group className="col-md-10" controlId="formBasicEmail">

                    <Form.Label className='comments-title'>Comments</Form.Label>
                    <Form.Control type="text" placeholder="Enter Comments" value={content}
                        onChange={e => setContent(e.target.value)} className="comment-form-input" />

                </Form.Group>
                <Button variant="primary" type="submit" className='comments-submit'>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Comments