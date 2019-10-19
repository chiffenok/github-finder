import React, { Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/Search';
import axios from 'axios';

class App extends Component {
    state = {
        users: [],
        loading: false,
        alert: null
    };
    async componentDidMount() {
        this.setState({ loading: true });
        const res = await axios.get(`https://api.github.com/users?
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({ users: res.data, loading: false });
    }

    searchUsers = async text => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ users: res.data.items, loading: false });
    };

    clearUsers = () => this.setState({ users: [] });

    setAlert = (msg, type) => {
        this.setState({ alert: { msg, type } });
        setTimeout(params => {
            this.setState({ alert: null });
        }, 3000);
    };

    render() {
        const { loading, users, alert } = this.state;

        return (
            <div className='App'>
                <Navbar title='Test' />
                <div className='container'>
                    <Alert alert={alert} />
                    <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={!!users}
                        setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                </div>
            </div>
        );
    }
}

export default App;
