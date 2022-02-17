import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import vinylSVG from 'images/vinyl.svg';
import { COLORS } from 'styles';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
const StyledLink = styled(Link)`
  color: ${COLORS.eggshell};
  display: flex;
  padding: 1rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 1rem;
`;

const Artist = styled.span`
  font-style: italic;
  font-size: 1.4rem;
`;

const List = ({ items }) => {
  const location = useLocation();

  if (!items) {
    return null;
  }

  return (
    <>
      {items.map(({ basic_information: { id, title, thumb, artists } }) => {
        const artist = _.get(artists, '[0].name');

        return (
          <StyledLink to={`${location.pathname}/releases/${id}`} key={id}>
            <img src={thumb || vinylSVG} alt="cover" width="60px" height="60px" />
            <Info>
              <span>{title}</span>
              {artists ? <Artist>{artist}</Artist> : null}
            </Info>
          </StyledLink>
        );
      })}
    </>
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
