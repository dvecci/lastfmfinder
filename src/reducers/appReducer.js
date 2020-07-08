const initialState = {
    readMore: false
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
	    case 'SET_USER_DATA':
	        const {
	            userName,
	            lovedTracks,
	            sessionKey
	        } = action.payload;
	        return {
	            ...state,
	            userName,
	            lovedTracks,
	            sessionKey
	        };
		case 'SET_ARTISTS':
			const artists = (((action.payload || {}).results || {}).artistmatches || {}).artist;
			if (artists) {
			    return {
                    ...state,
                    artists: artists.reduce((obj, val) => {
                        obj[val.name] = val
                        return obj;
                    },  {}),
                    bioReadMore: false,
                    tracksReadMore: false
                };
			}
			return {
			    ...state,
			    selectedArtist: undefined,
			    artists: undefined,
			    albumInfo: undefined,
			    description: undefined
			};
        case 'IS_FETCHING':
            return {
                ...state,
                isFetching: action.payload
            };
        case 'SET_ARTIST_DATA':
            const {
                description,
                topTracks,
                albumInfo,
                selectedArtist
            } = action.payload;
            return {
                ...state,
                description,
                topTracks,
                albumInfo,
                selectedArtist,
                bioReadMore: false,
                tracksReadMore:false
            };
        case 'SET_INPUT_FIELD':
            return {
                ...state,
                inputVal: action.payload
            };
        case 'SET_TYPING_INPUT_FIELD':
            return {
                ...state,
                inputVal: action.payload,
                selectedArtist: undefined
            };
        case 'SET_BIO_READ_MORE':
            return {
                ...state,
                bioReadMore: true
            };
        case 'SET_TRACKS_READ_MORE':
            return {
                ...state,
                tracksReadMore: true
            };
		default:
			return state;
	}
};

export default appReducer;