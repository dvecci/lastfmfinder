import React from 'react';
import { expect } from 'chai';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import { Artist } from '../Artist';
import Adapter from 'enzyme-adapter-react-16';

chai.use(sinonChai);

configure({ adapter: new Adapter() });

describe('Artist', () => {
    it('renders', () => {
        const wrapper = shallow(<Artist artist="testArtist" />);
        expect(wrapper.is('div'));
        expect(wrapper.find('div').text()).to.equal('testArtist');
    });

    it('will call handleClick on update if selected', () => {
        const selectArtistMock = sinon.spy();
        const wrapper = shallow(<Artist selected selectArtist={selectArtistMock} artist="testArtist" />);
        const inst = wrapper.instance();
        inst.componentDidUpdate();
        expect(selectArtistMock).to.have.been.calledOnce;
    });

    it('will not call handleClick on update if not selected', () => {
        const selectArtistMock = sinon.spy();
        const wrapper = shallow(<Artist selectArtist={selectArtistMock} artist="testArtist" />);
        const inst = wrapper.instance();
        inst.componentDidUpdate();
        expect(selectArtistMock).to.not.have.been.calledOnce;
    });
});