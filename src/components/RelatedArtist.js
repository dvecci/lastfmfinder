import React from 'react';
import { connect } from 'react-redux';
import {
    setInputField as setInputFieldAction,
    fetchArtists as fetchArtistsAction
} from '../actions/actions';
import { getInputRef } from '../selectors/selectors';

export const RelatedArtist = ({ artist, setInputField, inputRef, fetchArtists }) => (
    <div className="relatedArtist" onClick={() => { setInputField(artist.name); fetchArtists(artist.name);}}>{artist.name}</div>
);

const ConnectedRelatedArtist = connect(
    state => ({
        inputRef: getInputRef(state)
    }),
    {
        setInputField: setInputFieldAction,
        fetchArtists: fetchArtistsAction
    }
)(RelatedArtist);

export default ConnectedRelatedArtist;