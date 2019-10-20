import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/Search';
import axios from 'axios';

class App extends Component {
    state = {
        users: [],
        user: {},
        repos: [],
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

    getUser = async username => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ user: res.data, loading: false });
    };

    getUserRepos = async username => {
        this.setState({ loading: true });
        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=reated:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ repos: res.data, loading: false });
    };

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
        const { loading, users, user, repos, alert } = this.state;

        return (
            <Router>
                <div className='App'>
                    <Navbar title='Test' />
                    <div className='container'>
                        <Alert alert={alert} />
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={props => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={!!users}
                                            setAlert={this.setAlert}
                                        />
                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
                                    </Fragment>
                                )}
                            />
                            <Route exact path='/about' component={About} />
                            <Route
                                exact
                                path='/user/:login'
                                render={props => (
                                    <User
                                        {...props}
                                        getUser={this.getUser}
                                        getUserRepos={this.getUserRepos}
                                        user={user}
                                        repos={repos}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
