import React from 'react';
import { connect } from 'react-redux';
import ArtistSearch from '../components/ArtistSearch';
import ArtistList from '../components/ArtistList';
import ArtistDescription from '../components/ArtistDescription';
import { getUserName } from '../selectors/selectors';
import {
    useHistory
} from 'react-router-dom';

export const Home = ({ userName }) => {
    useHistory().push('/');
    return (<div className="App">
                 <section className="mainContent">
                   <aside className="searchColumn">
                       <header className="appHeader">
                         <h1 className="lastFmLogo">Last FM Artist Finder</h1>
                         <div className="subLogoText">Artist Finder</div>
                         <div className="subLogoText">{userName}</div>
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
           );
};


const ConnectedHome = connect(
    state => ({
        userName: getUserName(state)
    })
)(Home);

export default ConnectedHome;