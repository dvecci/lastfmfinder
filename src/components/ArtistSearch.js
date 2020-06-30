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