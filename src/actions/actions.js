import redux from 'redux';
import { createAction } from 'redux-actions';
export const setArtists = createAction('SET_ARTISTS');
export const selectArtist = createAction('SELECT_ARTIST');
export const setDescription = createAction('SET_DESCRIPTION');
export const setAlbumInfo = createAction('SET_ALBUM_INFO');

export const getSelectedArtistDescription = artist => {
    return dispatch => fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=5a5ae083ffb3779a07d3fec6fc4f6523&format=json').then(
        desc => desc.json()
    ).then(descJson => dispatch(setDescription(descJson)))
};

export const getSelectedArtistAlbums = artist => {
    return dispatch => fetch('http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + artist + '&api_key=5a5ae083ffb3779a07d3fec6fc4f6523&format=json').then(
        albumInfo => albumInfo.json()
    ).then(descAlbumInfo => dispatch(setAlbumInfo(descAlbumInfo)))
};

export const fetchArtists = artist => {
  return dispatch => fetch('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + artist + '&api_key=5a5ae083ffb3779a07d3fec6fc4f6523&format=json').then(
    artists => artists.json()
  ).then(artistJson => dispatch(setArtists(artistJson)))
};