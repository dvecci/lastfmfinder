import React from 'react';
import { connect } from 'react-redux';
import { fetchArtists as fetchArtistsAction } from '../actions/actions';

const ArtistSearch = ({fetchArtists}) => {
    return (
        <div className="searchInputContainer">
            <h2>Search For Your Favorite Artist</h2>
            <input type="text" onChange={evt => { fetchArtists(evt.target.value);}} />
        </div>
    )
}

const ConnectedArtistSearch = connect(
    null,
    {
        fetchArtists: fetchArtistsAction
    }
)(ArtistSearch);

export default ConnectedArtistSearch;