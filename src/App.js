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

          <section className="mainContent">
            <aside className="searchColumn">
                <header className="appHeader">
                  <h1 className="lastFmLogo">Last FM Artist Finder</h1>
                  <div className="subLogoText">Artist Finder</div>
                </header>
                <section className="artistSearch">
                    <ArtistSearch />
                    <ArtistList />
                </section>
            </aside>
            <section className="artistDescription">
                <ArtistDescription />
            </section>
          </section>
        </div>
    }
}

export default App;
