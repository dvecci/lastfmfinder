import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    setInputField as setInputFieldAction,
    selectArtist as selectArtistAction,
    fetchArtists as fetchArtistsAction
} from '../actions/actions';
import { getInputRef } from '../selectors/selectors';

export const RelatedArtist = ({
    artist,
    setInputField,
    selectArtist,
    fetchArtists
}) => (
    <div className="relatedArtist" onClick={() => {
        setInputField(artist.name);
        selectArtist(artist.name);
        fetchArtists(artist.name);
    }}>{artist.name}</div>
);

RelatedArtist.propTypes = {
    artist: PropTypes.string,
    setInputField: PropTypes.func,
    selectArtist: PropTypes.func,
    fetchArtists: PropTypes.func
};

const ConnectedRelatedArtist = connect(
    state => ({
        inputRef: getInputRef(state)
    }),
    {
        setInputField: setInputFieldAction,
        selectArtist: selectArtistAction,
        fetchArtists: fetchArtistsAction
    }
)(RelatedArtist);

export default ConnectedRelatedArtist;