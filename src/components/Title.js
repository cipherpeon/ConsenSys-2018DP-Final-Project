import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from '../styles';

const StyledTitle = styled.h1`
  color: ${colors.darkGrey};
  position: relative;
  font-size: ${fonts.size.large};
  text-decoration: ${({underline}) => underline ? 'underline' : 'none'};
  margin-top:0;
`;

const Title = ({
  text,
  underline,
  ...props
}) => (
  <StyledTitle
    text={text}
    underline={underline}
    {...props}
  >
    {text}
  </StyledTitle>
);

Title.propTypes = {
  text: PropTypes.string,
  underline: PropTypes.bool,
};

Title.defaultProps = {
  text: 'Read me',
  underline: false,
};

export default Title;
