import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './discogsList.scss';
import vinylSVG from 'images/vinyl.svg';

const DiscogsList = ({ items }) => {
    if (!items) {
        return null;
    }

    return (
        <div className="discogs-list">
            {items.map(
                ({ basic_information: { id, title, thumb, artists } }) => {
                    const artist = _.get(artists, '[0].name');

                    return (
                        <div key={id} className="discogs-list-row">
                            <img
                                src={thumb || vinylSVG}
                                alt="cover"
                                width="60px"
                                height="60px"
                            />
                            <div className="discogs-list-info">
                                <span className="discogs-list-titile">
                                    {title}
                                </span>
                                {artists ? (
                                    <span className="discogs-list-artist">
                                        {artist}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    );
                }
            )}
        </div>
    );
};

DiscogsList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            basic_information: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                thumb: PropTypes.string,
                artists: PropTypes.arrayOf(
                    PropTypes.shape({
                        name: PropTypes.string
                    })
                )
            })
        })
    ).isRequired
};
export default DiscogsList;
