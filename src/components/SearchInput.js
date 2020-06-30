import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchArtists as fetchArtistsAction,
    setTypingInputField as setInputFieldAction
} from '../actions/actions';
import { getInputVal } from '../selectors/selectors';

export class SearchInput extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.props.setTypingInputField(evt.target.value);
        this.props.fetchArtists(evt.target.value);
    }

    render() {
        const value = this.props.inputVal || this.state.value;
        return (<input className="searchInput" value={value} type="text" onChange={evt => { this.handleChange(evt);}} />);
    }
};

SearchInput.propTypes = {
    setTypingInputField: PropTypes.func,
    fetchArtists: PropTypes.func,
    inputVal: PropTypes.string
};

const ConnectedSearchInput = connect(
    state => ({
        inputVal: getInputVal(state)
    }),
    {
        fetchArtists: fetchArtistsAction,
        setTypingInputField: setInputFieldAction
    }
)(SearchInput);

export default ConnectedSearchInput;