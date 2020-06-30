import React from 'react';
import { connect } from 'react-redux';
import {
    getSelectedArtist,
    getSelectedArtistDescription,
    getSelectedArtistAlbums,
    getRelatedArtists,
    getLastFmLink,
    getReadMoreDisplay
} from '../selectors/selectors';
import {
    readMore as readMoreAction
} from '../actions/actions';
import RelatedArtist from './RelatedArtist';

export const ArtistDescription = ({
    selectedArtist,
    selectedArtistDescription,
    selectedArtistAlbums,
    relatedArtists,
    lastFmLink,
    readMoreDisplay,
    readMore
}) => {
    const descriptionContainerClass = readMoreDisplay ? 'descriptionExpanded' : 'descriptionContainer';
    const readMoreButtonClass = readMoreDisplay ? 'readMoreButtonHidden' : 'readMoreButton';
    return selectedArtist ? (
            <section className="artistInfo">
                <div className="artistTitleHeader">
                    <h2 className="artistTitle">{selectedArtist}</h2>
                    <a className="lastFmLink" href={lastFmLink} rel="noopener" target="_blank">View on lastfm</a>
                </div>
                <div className="artistContainer">
                    <div className="artistBio">
                        { selectedArtistDescription && (
                            <div className="description">
                                <h2>Biography</h2>
                                <button onClick={readMore} className={readMoreButtonClass}>Read More</button>
                                <div className={descriptionContainerClass}>
                                    <p>{selectedArtistDescription}</p>
                                </div>
                            </div>
                        )}
                        {selectedArtistAlbums && (
                            <div className="albumSection">
                                <h2>Albums</h2>
                                <div className="albumContainer">
                                    { selectedArtistAlbums && selectedArtistAlbums.map(
                                        (album, index) => (
                                            <a href={album.url} rel="noopener" target="_blank" className="album" key={index}>
                                                <img className="albumImage" src={album.image} />
                                                <div className="albumName">{album.name}</div>
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relatedArtistsContainer">
                        <h2>Related Artists</h2>
                        {relatedArtists && relatedArtists.length ? relatedArtists.map(relatedArtist => (
                            <RelatedArtist artist={relatedArtist} />
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
        lastFmLink: getLastFmLink(state),
        readMoreDisplay: getReadMoreDisplay(state)
    }),
    {
        readMore: readMoreAction
    }
)(ArtistDescription);

export default ConnectedArtistDescription;