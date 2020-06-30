import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getArtistNames as getArtistNamesSelector,
    getSelectedArtist
} from '../selectors/selectors';
import Artist from './Artist';

export const ArtistList = React.memo(({artists, selectedArtist}) =>
    artists.length ? (
        <div className="artistsList">
            <h2>Results</h2>
            {artists.map((artist, index) => {
                if ((!selectedArtist && index === 0) || selectedArtist === artist) {
                    return (<Artist selected key={index} artist={artist} />)
                }
                return (<Artist key={index} artist={artist} />)
            })}
        </div>
    ) : null);

ArtistList.propTypes = {
    artists: PropTypes.array,
    selectedArtist: PropTypes.string
};

const ConnectedArtistList = connect(state => ({
        artists: getArtistNamesSelector(state),
        selectedArtist: getSelectedArtist(state)
}))(ArtistList)

export default ConnectedArtistList;