import { COLORS, SIZES, FONT_WEIGHTS } from 'styles';
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

const AvatarWrapper = styled.div`
  clip-path: circle(50%);

  &:hover {
    opacity: 0.8;
    cursor: pointer;
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
        {user.username ? (
          <AvatarWrapper
            onClick={() => {
              // TODO: make a menu, also fix the damn cut-off circle
              console.log('MAKE DAMN MENU, also fix the damn cut-off circle');
            }}
          >
            <img src={user.avatarUrl} alt="avatar" height={`${SIZES.headerHeight * 10 - 30}px`} />
          </AvatarWrapper>
        ) : (
          <Icon className="fal fa-turntable" />
        )}
      </div>
    </StyledHeader>
  );
};

export default Header;
