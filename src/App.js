import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import PropTypes from 'prop-types';
import ArtistSearch from './components/ArtistSearch';
import ArtistList from './components/ArtistList';
import ArtistDescription from './components/ArtistDescription';
import md5 from 'md5';
import {
    setUserData as setUserDataAction
} from './actions/actions';
import { getUserName } from './selectors/selectors';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './containers/Home';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        };
    }
    componentDidMount() {
        const url = new URL(window.location);
        const token = url.searchParams.get('token');
        if (!token) {
            window.location = 'https://www.last.fm/api/auth?api_key=5a5ae083ffb3779a07d3fec6fc4f6523&cb=http://localhost:3000';
        } else {
            const apiSig = md5(`api_key5a5ae083ffb3779a07d3fec6fc4f6523methodauth.getSessiontoken${token}d4597c86392dc6c59101b75bcd14b0cf`);
            fetch(`http://ws.audioscrobbler.com/2.0/?format=json&method=auth.getSession&api_sig=${apiSig}&api_key=5a5ae083ffb3779a07d3fec6fc4f6523&token=${token}`).then(
                response => response.json()
            ).then(
                session => {
                    const userName = session.session.name;
                    const sessionKey = session.session.key;
                    this.setState({ authenticated: true });
                    fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=${userName}&api_key=5a5ae083ffb3779a07d3fec6fc4f6523&format=json`).then(
                        lovedTracksResponse => lovedTracksResponse.json()
                    ).then(
                        lovedTracks => this.props.setUserData({
                            userName,
                            lovedTracks,
                            sessionKey
                        })
                    );
                }
            );
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    { this.state.authenticated &&
                        <Route path="/">
                            <Home />
                        </Route>
                    }
                </Switch>
            </Router>
        );
    }
}

const ConnectedApp = connect(
    state => ({
        userName: getUserName(state)
    }),
    {
        setUserData: setUserDataAction
    }
)(App);

export default ConnectedApp;
