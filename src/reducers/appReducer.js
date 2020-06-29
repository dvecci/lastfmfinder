const initialState = {};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
//	    case 'SET_SELECT_ARTIST':
//	        return {
//	            ...state,
//	            selectedArtist: action.payload
//	        };
		case 'SET_ARTISTS':
			const artists = (((action.payload || {}).results || {}).artistmatches || {}).artist;
			console.log(';; set artists action');
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

//        case 'SET_DESCRIPTION':
               //            console.log(';; set desc reducer');
               //            const description = action.payload;
               //            return {
               //                ...state,
               //                description
               //            };
               //        case 'SET_ALBUM_INFO':
               //            const albumInfo = action.payload;
               //            if (albumInfo) {
               //                return {
               //                    ...state,
               //                    albumInfo
               //                };
               //            }
               //            return {
               //                ...state,
               //                albumInfo: undefined
               //            }
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
                selectedArtist
            };
        case 'SET_INPUT_FIELD':
            console.log(';;action', action);
            return {
                ...state,
                inputVal: action.payload,
                selectedArtist: action.payload
            };
        case 'SET_TYPING_INPUT_FIELD':
            console.log(';; set typing input field')
            return {
                ...state,
                inputVal: action.payload,
                selectedArtist: undefined
            };
		default:
			return state;
	}
};

export default appReducer;