import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts, borders } from '../styles';

import Subtitle from '../components/Subtitle.js';
import Address from '../components/Address.js';
import Button from '../components/Button.js';

const StyledSocietyBlock = styled.div`
  color: ${colors.darkGrey};
  position: relative;
`;

const SocietyBlock = ({
  address,
  name,
  location,
  admin,
  socialLink,
  buttonText,
  buttonFunction,
  ...props
}) => (
  <StyledSocietyBlock
    address={address}
    name={name}
    location={location}
    admin={admin}
    socialLink={socialLink}
    buttonText={buttonText}
    buttonFunction={buttonFunction}
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
      {socialLink && <a href={socialLink} target="_blank"><Address
        text={"Social Link: " + socialLink}
      /></a>}
      {buttonText.length > 0
      &&
      <Button
        size={fonts.size.small}
        border={borders.width.moderate}
        text={buttonText}
        onClick={buttonFunction}
      />}
    </div>
  </StyledSocietyBlock>
);

SocietyBlock.propTypes = {
  address: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  admin: PropTypes.string,
  socialLink: PropTypes.string,
  buttonText: PropTypes.string,
  buttonFunction: PropTypes.function,
};

SocietyBlock.defaultProps = {
  address: '',
  name: '',
  location: '',
  admin: '',
  buttonText: '',
};

export default SocietyBlock;
