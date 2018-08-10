import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from '../styles';

import Subtitle from '../components/Subtitle.js';
import Address from '../components/Address.js';

const StyledSocietyBlock = styled.div`
  color: ${colors.darkGrey};
  position: relative;
`;

const SocietyBlock = ({
  address,
  name,
  location,
  admin,
  ...props
}) => (
  <StyledSocietyBlock
    address={address}
    name={name}
    location={location}
    admin={admin}
    {...props}
  >
    <div>
      <Subtitle
        text={name}
      />
      <Address
        text={"Contract address: " + address}
      />
      <Address
        text={"Location: " + location}
      />
      <Address
        text={"Admin: " + admin}
      />
    </div>
  </StyledSocietyBlock>
);

SocietyBlock.propTypes = {
  address: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  admin: PropTypes.string,
};

SocietyBlock.defaultProps = {
  address: '',
  name: '',
  location: '',
  admin: '',
};

export default SocietyBlock;
