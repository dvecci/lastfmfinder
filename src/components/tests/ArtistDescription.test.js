   import React from 'react';
   import { expect } from 'chai';
   import { shallow, configure } from 'enzyme';
   import sinon from 'sinon';
   import chai from 'chai';
   import sinonChai from 'sinon-chai';
   import { ArtistDescription } from '../ArtistDescription';
   import Adapter from 'enzyme-adapter-react-16';

   chai.use(sinonChai);

   configure({ adapter: new Adapter() });

   describe('ArtistDescription', () => {
       it('renders', () => {
           const wrapper = shallow(<ArtistDescription />);
           expect(wrapper.is('section'));
       });

       it('should have an artist title of the selected artist', () => {
            const wrapper = shallow(<ArtistDescription selectedArtist="testSelectedArtist" />);
            expect(wrapper.find('.artistTitle').text()).to.equal('testSelectedArtist');
       });
   });