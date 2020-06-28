import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import PropTypes from 'prop-types';
import ArtistSearch from './components/ArtistSearch';
import ArtistList from './components/ArtistList';
import ArtistDescription from './components/ArtistDescription';

export class App extends React.Component {

    render() {
        return <div className="App">
          <header className="appHeader">
            <h1>Last FM Artist Finder</h1>
          </header>
          <section className="mainContent">
            <section className="artistSearch">
                <ArtistSearch />
                <ArtistList />
            </section>
            <section className="artistDescription">
                <ArtistDescription />
            </section>
          </section>
        </div>
    }
}

export default App;
