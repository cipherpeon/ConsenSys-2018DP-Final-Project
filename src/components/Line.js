import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../styles';

const StyledLine = styled.div`
  background-color: ${({color}) => color};
  width: 100%;
  height: 3px;
  position: relative;
  margin-bottom: 20px;
`;

const Line = ({
  color,
}) => (
  <StyledLine
    color={color}
  />
);

Line.propTypes = {
  color: PropTypes.string,
};

Line.defaultProps = {
  color: colors.lightGrey,
};

export default Line;
