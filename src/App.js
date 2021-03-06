import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import NotFound from './components/pages/NotFound';

const App = () => {
    // async componentDidMount() {
    //     this.setState({ loading: true });
    //     const res = await axios.get(`https://api.github.com/users?
    //     client_id=${githubClientId}
    //     &client_secret=${githubClientSecret}`);
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
                                <Route exact path='/' component={Home} />
                                <Route exact path='/about' component={About} />
                                <Route
                                    exact
                                    path='/user/:login'
                                    component={User}
                                />
                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
