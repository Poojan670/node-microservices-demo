import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './pages/Home'
import PostList from './components/PostList';

const App = () => {
    return (
        <div>
            <Home />
            <hr />
            <PostList />
        </div>
    )
}

export default App