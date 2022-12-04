import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from './Comments';
import CommentsList from './CommentsList';

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://posts.com/posts')
        setPosts(res.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className='card w-25 mt-5 py-1 justify-content-between mx-lg-auto' key={post.id}>
                <div className="card-body">
                    <h3 className='posts-title'><strong>{post.title}</strong></h3>
                    <CommentsList comments={post.comments} />
                    <Comments postId={post.id} />
                </div>
            </div>
        )
    });


    return (
        <div>
            <h1 className='posts-title'>Posts</h1>
            <div className='posts-list'>
                {renderedPosts}
            </div>
        </div>
    )
}

export default PostList