import React from 'react';
import { connect } from 'react-redux';
import {
    selectArtist as selectArtistAction,
    getSelectedArtistDescription as getSelectedArtistDescriptionAction,
    getSelectedArtistAlbums as getSelectedArtistAlbumsAction
} from '../actions/actions';
import { getSelectedArtist } from '../selectors/selectors';

const Artist = ({
    artist,
    selectArtist,
    selectedArtist,
    getSelectedArtistDescription,
    getSelectedArtistAlbums
}) => {
    console.log('selectedArtist', selectedArtist);
    const artistClassName = selectedArtist === artist ? 'selectedArtist' : 'artist';
    return <div className={artistClassName} onClick={() => {
            selectArtist(artist);
            getSelectedArtistDescription(artist);
            getSelectedArtistAlbums(artist);
        }}>{artist}</div>;
}

const ConnectedArtist = connect(
    state => ({
        selectedArtist: getSelectedArtist(state)
    }),
    {
        selectArtist: selectArtistAction,
        getSelectedArtistDescription: getSelectedArtistDescriptionAction,
        getSelectedArtistAlbums: getSelectedArtistAlbumsAction
    }
)(Artist);

export default ConnectedArtist;