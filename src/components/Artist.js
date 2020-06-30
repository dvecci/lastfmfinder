import React from 'react';
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