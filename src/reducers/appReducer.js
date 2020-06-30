const initialState = {
    readMore: false
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ARTISTS':
			const artists = (((action.payload || {}).results || {}).artistmatches || {}).artist;
			if (artists) {
			    return {
                    ...state,
                    artists: artists.reduce((obj, val) => {
                        obj[val.name] = val
                        return obj;
                    },  {}),
                    readMore: false
                };
			}
			return {
			    ...state,
			    selectedArtist: undefined,
			    artists: undefined,
			    albumInfo: undefined,
			    description: undefined
			}
        case 'IS_FETCHING':
            return {
                ...state,
                isFetching: action.payload
            }
        case 'SET_ARTIST_DATA':
            const {
                description,
                albumInfo,
                selectedArtist
            } = action.payload;
            return {
                ...state,
                description,
                albumInfo,
                selectedArtist,
                readMore: false
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
        case 'SET_READ_MORE':
            return {
                ...state,
                readMore: true
            }
		default:
			return state;
	}
};

export default appReducer;