import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from '../styles';

const StyledSubtitle = styled.h1`
  color: ${colors.lightGrey};
  position: relative;
  font-size: ${fonts.size.medium};
  text-decoration: ${({underline}) => underline ? 'underline' : 'none'};
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Subtitle = ({
  text,
  underline,
  ...props
}) => (
  <StyledSubtitle
    text={text}
    underline={underline}
    {...props}
  >
    {text}
  </StyledSubtitle>
);

Subtitle.propTypes = {
  text: PropTypes.string,
  underline: PropTypes.bool,
};

Subtitle.defaultProps = {
  text: 'Read me',
  underline: false,
};

export default Subtitle;
