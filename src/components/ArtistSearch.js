import React from 'react';
import PropTypes from 'prop-types';
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
};

ArtistSearch.propTypes = {
    fetchArtists: PropTypes.func,
    inputVal: PropTypes.string
};

const ConnectedArtistSearch = connect(
    state => ({
        inputVal: getInputVal(state)
    }),
    {
        fetchArtists: fetchArtistsAction
    }
)(ArtistSearch);

export default ConnectedArtistSearch;