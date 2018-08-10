import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from '../styles';

const StyledAddress = styled.h1`
  color: ${colors.lightGrey};
  position: relative;
  font-size: ${fonts.size.small};
  text-overflow: ellipsis;
  margin-top: -20px;
  margin-bottom: 20px;
`;

const Address = ({
  text,
  ...props
}) => (
  <StyledAddress
    text={text}
    {...props}
  >
    {text}
  </StyledAddress>
);

Address.propTypes = {
  text: PropTypes.string,
};

Address.defaultProps = {
  text: '0x0000000000000000000000000000000000000000',
};

export default Address;
