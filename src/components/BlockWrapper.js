import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts, borders } from '../styles';


const StyledBlockWrapper = styled.div`
  padding-top: 10px;
  padding-left: 25px;
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
  border-style: solid;
  border-color: ${({color}) => color }
  border-width: ${({border}) => border + 'px'}
  margin-bottom: 20px;
`;

const BlockWrapper = ({
  border,
  color,
  ...props,
}) => (
  <StyledBlockWrapper
    border={border}
    color={color}
    {...props}
  />
);

BlockWrapper.propTypes = {
  border: PropTypes.number,
  color: PropTypes.string,
}

BlockWrapper.defaultProps = {
  border: borders.width.moderate,
  color: colors.darkGrey,
}

export default BlockWrapper;
