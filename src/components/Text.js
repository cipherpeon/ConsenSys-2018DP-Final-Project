import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from '../styles';

const StyledText = styled.p`
  color: ${colors.darkGrey};
  position: relative;
  font-size: ${fonts.size.small};
`;

const Text = ({
  text,
  ...props
}) => (
  <StyledText
    text={text}
    {...props}
  >
    {text}
  </StyledText>
);

Text.propTypes = {
  text: PropTypes.string,
};

Text.defaultProps = {
  text: 'Lorem ipsum',
};

export default Text;
