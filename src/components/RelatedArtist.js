import React from 'react';
import { connect } from 'react-redux';
import {
    setInputField as setInputFieldAction,
    selectArtist as selectArtistAction,
    fetchArtists as fetchArtistsAction
} from '../actions/actions';
import { getInputRef } from '../selectors/selectors';

export const RelatedArtist = ({ artist, setInputField, inputRef, selectArtist, fetchArtists }) => (
    <div className="relatedArtist" onClick={() => {
        setInputField(artist.name);
        selectArtist(artist.name);
        fetchArtists(artist.name);
    }}>{artist.name}</div>
);

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