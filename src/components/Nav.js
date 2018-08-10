import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts, transitions, borders } from '../styles';
import Button from './Button.js';

const StyledNav = styled.div`

`;

const Nav = ({
  routes,
  ...props
}) => (
  <StyledNav
    routes={routes}
    {...props}
  >
    {routes.map(route => {
      return(
        <Button
          text={route}
          href={route}
        />
      );
    })}
  </StyledNav>
);

Nav.propTypes = {
  routes: PropTypes.array.required,
};

Nav.defaultProps = {
  routes: ['/1', '/2', '/3'],
};

export default Nav;
