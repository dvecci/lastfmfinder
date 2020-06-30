import redux from 'redux';
import { createAction } from 'redux-actions';
export const setArtists = createAction('SET_ARTISTS');
export const setSelectArtist = createAction('SET_SELECT_ARTIST');
export const setInputField = createAction('SET_INPUT_FIELD');
export const setTypingInputField = createAction('SET_TYPING_INPUT_FIELD');
export const setArtistData = createAction('SET_ARTIST_DATA');
export const isFetching = createAction('IS_FETCHING');
export const readMore = createAction('SET_READ_MORE');

const ARTIST_CACHE = {};
const ALBUM_CACHE = {};
const DESCRIPTION_CACHE = {};

export const selectArtist = artist => {
    return dispatch => {
        dispatch(fetchSelectedArtistDescription(artist));
    }
}

export const fetchSelectedArtistDescription = artist => {
    const url = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=5a5ae083ffb3779a07d3fec6fc4f6523&format=json';
    if (DESCRIPTION_CACHE[url]) {
        return dispatch => {
            const description = DESCRIPTION_CACHE[url];
            dispatch(fetchSelectedArtistAlbums(artist, description));
        }
    } else {
        return dispatch => {
            fetch(url).then(
                desc => desc.json()
            ).then(description => {
                DESCRIPTION_CACHE[url] = description;
                dispatch(fetchSelectedArtistAlbums(artist, description));
            });
        }
    }
};

export const fetchSelectedArtistAlbums = (artist, description) => {
    const url = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + artist + '&api_key=5a5ae083ffb3779a07d3fec6fc4f6523&format=json';
    if (ALBUM_CACHE[url]) {
        return dispatch => {
            const albumInfo = ALBUM_CACHE[url];
            dispatch(setArtistData({
                description,
                albumInfo,
                selectedArtist: artist
            }));
        }
    } else {
        return dispatch => fetch(url).then(
            albumInfo => albumInfo.json()
        ).then(albumInfo => {
            ALBUM_CACHE[url] = albumInfo;
            dispatch(setArtistData({
                description,
                albumInfo,
                selectedArtist: artist
            }));
        });
    }
};

export const fetchArtists = artist => {
    const url = 'http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + artist + '&api_key=5a5ae083ffb3779a07d3fec6fc4f6523&format=json';
    if (ARTIST_CACHE[url]) {
        return dispatch => dispatch(setArtists(ARTIST_CACHE[url]));
    } else {
        return dispatch => {
            dispatch(isFetching(true));
            fetch('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + artist + '&api_key=5a5ae083ffb3779a07d3fec6fc4f6523&format=json').then(
                artists => artists.json()
            ).then(artistJson => {
                ARTIST_CACHE[url] = artistJson;
                dispatch(setArtists(artistJson));
                dispatch(isFetching(false));
            });
        }
    }
};