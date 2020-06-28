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

export const getSelectedArtistAlbums = state => {
    if (state.albumInfo) {
        const albums = state.albumInfo.topalbums.album;
        const albumInfo = [];
        albums.forEach(albumItem => {
            const album = {
                ...albumItem,
                image: albumItem.image[3]['#text']
            };
            albumInfo.push(album);
        });
        return albumInfo;
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