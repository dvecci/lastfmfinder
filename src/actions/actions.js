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
const ARTIST_INFO_CACHE = {};

export const selectArtist = artist => {
    if (ARTIST_INFO_CACHE[artist]) {
        return dispatch => {
            dispatch(setArtistData({
                description: ARTIST_INFO_CACHE[artist].description,
                albumInfo: ARTIST_INFO_CACHE[artist].albumInfo,
                selectedArtist: artist
            }));
        }
    } else {
        const artistPromises = [];
        const descriptionUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=5a5ae083ffb3779a07d3fec6fc4f6523&format=json';
        artistPromises.push(fetch(descriptionUrl));
        const albumUrl = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' + artist + '&api_key=5a5ae083ffb3779a07d3fec6fc4f6523&format=json';
        artistPromises.push(fetch(albumUrl));
        return dispatch => {
            Promise.all(artistPromises).then(
                async ([descriptionResponse, albumResponse]) => {
                    const description = await descriptionResponse.json();
                    const albumInfo = await albumResponse.json();
                    ARTIST_INFO_CACHE[artist] = {
                        description,
                        albumInfo
                    };
                    return [description, albumInfo];
                }
            ).then(([description, albumInfo]) => {
                dispatch(setArtistData({
                    description,
                    albumInfo,
                    selectedArtist: artist
                }));
            });
        }
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