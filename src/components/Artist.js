import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    selectArtist as selectArtistAction
} from '../actions/actions';
import { getSelectedArtist, getIsFetching } from '../selectors/selectors';

export class Artist extends React.PureComponent {
    componentDidUpdate() {
        if (this.props.selected && !this.props.isFetching) {
            this.handleClick();
        }
    }

    handleClick() {
        const {
            artist,
            selectArtist,
            selectedArtist
        }= this.props;
        if (artist !== selectedArtist) {
            selectArtist(artist);
        }
    }

    render ({
        artist,
        selectedArtist
    }= this.props)  {
        const artistClassName = selectedArtist === artist ? 'selectedArtist' : 'artist';
        return <div className={artistClassName} onClick={() => {
                this.handleClick();
            }}>{artist}</div>;
    }
}

Artist.propTypes = {
    selected: PropTypes.bool,
    isFetching: PropTypes.bool,
    selectedArtist: PropTypes.string,
    selectArtist: PropTypes.func
};

const ConnectedArtist = connect(
    state => ({
        selectedArtist: getSelectedArtist(state),
        isFetching: getIsFetching(state)
    }),
    {
        selectArtist: selectArtistAction
    }
)(Artist);

export default ConnectedArtist;