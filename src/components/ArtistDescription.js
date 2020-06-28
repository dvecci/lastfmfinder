import React from 'react';
import { connect } from 'react-redux';
import {
    getSelectedArtist,
    getSelectedArtistDescription,
    getSelectedArtistAlbums,
    getRelatedArtists,
    getLastFmLink
} from '../selectors/selectors';

export const ArtistDescription = ({
    selectedArtist,
    selectedArtistDescription,
    selectedArtistAlbums,
    relatedArtists,
    lastFmLink
}) => {
    console.log('selectedArtistDescription', selectedArtistDescription);
    console.log('selectedArtistAlbums', selectedArtistAlbums);
    console.log('relatedArtists', relatedArtists);
    return selectedArtist ? (
            <section className="artistInfo">
                <div className="artistContainer">
                    <div className="artistBio">
                        <div>
                            <h2 className="artistTitle">{selectedArtist}</h2>
                            <a className="lastFmLink" href={lastFmLink} rel="noopener" target="_blank">View on lastfm</a>
                        </div>
                        { selectedArtistDescription && (
                            <div className="description">
                                <h3>Description</h3>
                                <div className="descriptionContainer">{selectedArtistDescription}</div>
                            </div>
                        )}
                        {selectedArtistAlbums && (
                            <div className="albumSection">
                                <h3>Albums</h3>
                                <div className="albumContainer">
                                    { selectedArtistAlbums && selectedArtistAlbums.map(
                                        (album, index) => (
                                            <a href={album.url} rel="noopener" target="_blank" className="album" key={index}>
                                                <div className="albumName">{album.name}</div>
                                                <img className="albumImage" src={album.image} />
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relatedArtistsContainer">
                        <h3>Related Artists</h3>
                        {relatedArtists && relatedArtists.length ? relatedArtists.map(relatedArtist => (
                            <div>{relatedArtist.name}</div>
                        )) : null}
                    </div>
                </div>
            </section>
        ) : null;
}

export const ConnectedArtistDescription = connect(
    state => ({
        selectedArtist: getSelectedArtist(state),
        selectedArtistDescription: getSelectedArtistDescription(state) || undefined,
        selectedArtistAlbums: getSelectedArtistAlbums(state),
        relatedArtists: getRelatedArtists(state),
        lastFmLink: getLastFmLink(state)
    })
)(ArtistDescription);

export default ConnectedArtistDescription;