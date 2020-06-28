const initialState = {};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
	    case 'SELECT_ARTIST':
	        return {
	            ...state,
	            selectedArtist: action.payload
	        };
		case 'SET_ARTISTS':
			const artists = (((action.payload || {}).results || {}).artistmatches || {}).artist;
			if (artists) {
			    return {
                    ...state,
                    artists: artists.reduce((obj, val) => {
                        obj[val.name] = val
                        return obj;
                    },  {})
                };
			}
			return {
			    ...state,
			    selectedArtist: undefined,
			    artists: undefined,
			    albumInfo: undefined,
			    description: undefined
			}

        case 'SET_DESCRIPTION':
            const description = action.payload;
            return {
                ...state,
                description
            };
        case 'SET_ALBUM_INFO':
            const albumInfo = action.payload;
            if (albumInfo) {
                return {
                    ...state,
                    albumInfo
                };
            }
            return {
                ...state,
                albumInfo: undefined
            }

		default:
			return state;
	}
};

export default appReducer;