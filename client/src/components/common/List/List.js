import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import _ from 'lodash';
import './list.scss';
import vinylSVG from 'images/vinyl.svg';

const List = ({ items }) => {
    if (!items) {
        return null;
    }

    return (
        <div className="list">
            {items.map(
                ({ basic_information: { id, title, thumb, artists } }) => {
                    const artist = _.get(artists, '[0].name');

                    return (
                        <Link to={`/releases/${id}`} key={id} className="list-row">
                            <img
                                src={thumb || vinylSVG}
                                alt="cover"
                                width="60px"
                                height="60px"
                            />
                            <div className="list-info">
                                <span className="list-titile">
                                    {title}
                                </span>
                                {artists ? (
                                    <span className="list-artist">
                                        {artist}
                                    </span>
                                ) : null}
                            </div>
                        </Link>
                    );
                }
            )}
        </div>
    );
};

List.propTypes = {
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
export default List;
