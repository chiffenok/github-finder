import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/Search';

const App = () => {
    // async componentDidMount() {
    //     this.setState({ loading: true });
    //     const res = await axios.get(`https://api.github.com/users?
    //     client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    //     &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //     this.setState({ users: res.data, loading: false });
    // }

    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className='App'>
                        <Navbar title='Test' />
                        <div className='container'>
                            <Alert />
                            <Switch>
                                <Route
                                    exact
                                    path='/'
                                    render={props => (
                                        <Fragment>
                                            <Search />
                                            <Users />
                                        </Fragment>
                                    )}
                                />
                                <Route exact path='/about' component={About} />
                                <Route
                                    exact
                                    path='/user/:login'
                                    component={User}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
