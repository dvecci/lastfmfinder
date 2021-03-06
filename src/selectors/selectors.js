export const getArtistNames = state => Object.keys((state || {}).artists || {});

export const getSelectedArtist = state => state.selectedArtist;

export const getSelectedArtistDescription = state => {
    const selectedArtist = state.selectedArtist || undefined;
    if (selectedArtist && state.description) {
        const description = (((state.description || {}).artist || {}).bio || {}).content;
        return description;
    }
    return undefined;
};

export const getSelectedArtistTopTracks = state => {
    if (state.topTracks) {
        return ((state.topTracks || {}).toptracks || {}).track;
    }
    return undefined;
};

export const getSelectedArtistAlbums = state => {
    if (state.albumInfo) {
        const albums = ((state.albumInfo || {}).topalbums || {}).album;
        const albumInfo = [];
        if (albums) {
            albums.forEach(albumItem => {
                const album = {
                    ...albumItem,
                    image: albumItem.image[2]['#text']
                };
                albumInfo.push(album);
            });
            return albumInfo;
        }
    }
    return undefined;
};

export const getRelatedArtists = state => {
    if (state.description) {
        return (((state.description || {}).artist || {}).similar || {}).artist
    }
    return undefined;
};

export const getLastFmLink = state => {
    if (state.description) {
        return ((state.description || {}).artist || {}).url
    }
    return undefined;
};

export const getInputVal = state => {
    return state.inputVal;
};

export const getInputRef = state => {
    return state.inputRef;
};

export const getIsFetching = state => {
    return state.isFetching;
};

export const getBioReadMoreDisplay = state => {
    return state.bioReadMore;
};

export const getTracksReadMoreDisplay = state => {
    return state.tracksReadMore;
};

export const getUserName = state => {
    return state.userName;
};

export const getLovedTracks = state => {
    if (state.lovedTracks) {
        return state.lovedTracks.lovedtracks.track.map(track => track.url);
    }
    return undefined;
}