import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import UserItem from './components/users/UserItem';

function App() {
    return (
        <div className='App'>
            <Navbar title='Test' />
            <div className='container'>
                <UserItem />
            </div>
        </div>
    );
}

export default App;
