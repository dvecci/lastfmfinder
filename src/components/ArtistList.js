import React from 'react';
import { connect } from 'react-redux';
import { getArtistNames as getArtistNamesSelector } from '../selectors/selectors';
import Artist from './Artist';

export const ArtistList = ({artists}) => {
    console.log('artists', artists);
    return artists.length ? (
        <div className="artistsList">
            <h3>Artists</h3>
            {artists.map((artist, index) => (<Artist key={index} artist={artist} />))}
        </div>
    ) : null;
};

const ConnectedArtistList = connect(state => ({
        artists: getArtistNamesSelector(state)
    }
))(ArtistList)

export default ConnectedArtistList;