import React from 'react';
import { connect } from 'react-redux';
import { fetchArtists as fetchArtistsAction } from '../actions/actions';
import { getInputVal } from '../selectors/selectors';
import SearchInput from './SearchInput';

const ArtistSearch = ({
    fetchArtists,
    inputVal
}) => {
    return (
        <div className="searchInputContainer">
            <h2>Search For Your Favorite Artist</h2>
            {/*<input defaultValue={inputVal} type="text" onChange={evt => { fetchArtists(evt.target.value);}} />*/}
            <SearchInput />
        </div>
    )
}

const ConnectedArtistSearch = connect(
    state => ({
        inputVal: getInputVal(state)
    }),
    {
        fetchArtists: fetchArtistsAction
    }
)(ArtistSearch);

export default ConnectedArtistSearch;