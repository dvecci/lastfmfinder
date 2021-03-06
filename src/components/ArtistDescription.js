import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getSelectedArtist,
    getSelectedArtistDescription,
    getSelectedArtistTopTracks,
    getSelectedArtistAlbums,
    getRelatedArtists,
    getLastFmLink,
    getBioReadMoreDisplay,
    getTracksReadMoreDisplay,
    getLovedTracks
} from '../selectors/selectors';
import {
    bioReadMore as bioReadMoreAction,
    tracksReadMore as tracksReadMoreAction
} from '../actions/actions';
import RelatedArtist from './RelatedArtist';

export const ArtistDescription = ({
    selectedArtist,
    selectedArtistDescription,
    selectedArtistTopTracks,
    selectedArtistAlbums,
    relatedArtists,
    lastFmLink,
    bioReadMoreDisplay,
    bioReadMore,
    tracksReadMoreDisplay,
    tracksReadMore,
    lovedTracks
}) => {
    const descriptionContainerClass = bioReadMoreDisplay ? 'descriptionExpanded' : 'descriptionContainer';
    const bioReadMoreButtonClass = bioReadMoreDisplay ? 'readMoreButtonHidden' : 'readMoreButton';
    const tracksContainerClass = tracksReadMoreDisplay ? 'tracksExpanded' : 'tracksContainer';
    const tracksReadMoreButtonClass = tracksReadMoreDisplay ? 'readMoreButtonHidden' : 'readMoreButton';
    return selectedArtist ? (
            <section className="artistInfo">
                <div className="artistTitleHeader">
                    <h2 className="artistTitle">{selectedArtist}</h2>
                    <a className="lastFmLink" href={lastFmLink} rel="noopener noreferrer" target="_blank">View on lastfm</a>
                </div>
                <div className="artistContainer">
                    <div className="artistBio">
                        { selectedArtistDescription && (
                            <div className="description">
                                <h2>Biography</h2>
                                <button onClick={bioReadMore} className={bioReadMoreButtonClass}>Read More</button>
                                <div className={descriptionContainerClass}>
                                    <p>{selectedArtistDescription}</p>
                                </div>
                            </div>
                        )}
                        { selectedArtistTopTracks && (
                            <div className="topTracks">
                                <h2>Top Tracks</h2>
                                <button onClick={tracksReadMore} className={tracksReadMoreButtonClass}>Read More</button>
                                <div className={tracksContainerClass}>
                                    { selectedArtistTopTracks.map(
                                        (track, index) => (
                                            <div className="topTrack" key={index}>
                                                <a href={track.url} rel="noopener noreferrer" target="_blank" className="topTrack">{track.name}</a>
                                                {lovedTracks.includes(track.url) && (
                                                    <span className="loveIcon"></span>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                        {selectedArtistAlbums && (
                            <div className="albumSection">
                                <h2>Albums</h2>
                                <div className="albumContainer">
                                    { selectedArtistAlbums && selectedArtistAlbums.map(
                                        (album, index) => (
                                            <a href={album.url} rel="noopener noreferrer" target="_blank" className="album" key={index}>
                                                { album.image ? (
                                                    <img className="albumImage" src={album.image} alt={album.name} />
                                                ) : (
                                                    <div className="noImage">No Image Available</div>
                                                )}
                                                <div className="albumName">{album.name !== '(null)' ? album.name : 'No album name'}</div>
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    {relatedArtists && relatedArtists.length && (
                        <div className="relatedArtistsContainer">
                            <h2>Related Artists</h2>
                            {relatedArtists.map((relatedArtist, index) => (
                                <RelatedArtist key={index} artist={relatedArtist} />
                            ))}
                        </div>
                    )}

                </div>
            </section>
        ) : null;
};

ArtistDescription.propTypes = {
  selectedArtist: PropTypes.string,
  selectedArtistDescription: PropTypes.string,
  selectedArtistAlbums: PropTypes.array,
  relatedArtists: PropTypes.array,
  lastFmLink: PropTypes.string,
  readMoreDisplay: PropTypes.bool,
  readMore: PropTypes.func
};

export const ConnectedArtistDescription = connect(
    state => ({
        selectedArtist: getSelectedArtist(state),
        selectedArtistDescription: getSelectedArtistDescription(state),
        selectedArtistTopTracks: getSelectedArtistTopTracks(state),
        selectedArtistAlbums: getSelectedArtistAlbums(state),
        relatedArtists: getRelatedArtists(state),
        lastFmLink: getLastFmLink(state),
        bioReadMoreDisplay: getBioReadMoreDisplay(state),
        tracksReadMoreDisplay: getTracksReadMoreDisplay(state),
        lovedTracks: getLovedTracks(state)
    }),
    {
        bioReadMore: bioReadMoreAction,
        tracksReadMore: tracksReadMoreAction
    }
)(ArtistDescription);

export default ConnectedArtistDescription;