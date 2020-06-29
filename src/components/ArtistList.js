import React from 'react';
import { connect } from 'react-redux';
import {
    getArtistNames as getArtistNamesSelector,
    getSelectedArtist,
    getIsFetching
} from '../selectors/selectors';
import Artist from './Artist';

export const ArtistList = React.memo(({artists, selectedArtist, isFetching}) =>
    artists.length ? (
        <div className="artistsList">
            <h3>Artists</h3>
            {artists.map((artist, index) => {
                if ((!selectedArtist && index === 0) || selectedArtist === artist) {
                    return (<Artist selected key={index} artist={artist} />)
                }
                return (<Artist key={index} artist={artist} />)
            })}
        </div>
    ) : null);

const ConnectedArtistList = connect(state => ({
        artists: getArtistNamesSelector(state),
        selectedArtist: getSelectedArtist(state)
    }
))(ArtistList)

export default ConnectedArtistList;