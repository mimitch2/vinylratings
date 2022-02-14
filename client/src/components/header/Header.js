import { COLORS, SIZES } from 'styles';
import { links } from './headerConstants';
import { NavLink } from 'react-router-dom';
import { UserContext } from 'App';
import React, { useContext } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.eggshell};
  padding: 0 ${SIZES.sidePadding}rem;
  height: ${SIZES.headerHeight}rem;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 2rem;
  font-family: 'Roboto Mono', sans-serif;

  &:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

const Icon = styled.i`
  font-size: 3rem;
`;

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <StyledHeader>
      <div>
        {links.map(({ text, to, authRoute }) => {
          if (authRoute && !user.username) {
            return null;
          }
          return (
            <StyledNavLink
              key={text}
              to={to}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {text}
            </StyledNavLink>
          );
        })}
      </div>
      <div>
        {user.username && <span>{user.username}</span>}
        <Icon className="fal fa-album-collection" />
        {/* <i className="fal fa-turntable"></i> */}
      </div>
    </StyledHeader>
  );
};

export default Header;
