import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts, transitions, borders } from '../styles';

const StyledButton = styled.button`
  transition: ${transitions.button};
  color: ${({color}) => color};
  background-color: transparent;
  border-width: ${({border}) => border + 'px'}
  border-color: ${({color}) => color};
  border-radius: ${({round}) => round ? '4px' : '0px'}
  position: relative;
  display: block;
  margin-bottom: 10px;
  padding: 5px 20px;
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto' };
  opacity: ${({ disabled }) => disabled ? '0.5' : '1' };
  font-size: ${({size}) => size};
  &:focus {
    outline: none;
  };
  &:hover {
    color: ${({hoverColor}) => hoverColor};
    border-color: ${({hoverColor}) => hoverColor};
    border-bottom-width: ${({border}) => 2 * border + 'px'}
    margin-top: ${({border}) => 0 - border + 'px'}
  };
  &:active {
    color: ${({activeColor}) => activeColor};
    border-color: ${({activeColor}) => activeColor};
    border-bottom-width: ${({border}) => border + 'px'};
    border-style: solid;
    margin-top: 0px;
  }
`;

const Button = ({
  text,
  color,
  hoverColor,
  activeColor,
  size,
  border,
  disabled,
  round,
  href,
  ...props
}) => (
  <a href={href}>
    <StyledButton
      text={text}
      color={color}
      hoverColor={hoverColor}
      activeColor={activeColor}
      size={size}
      border={border}
      disabled={disabled}
      round={round}
      {...props}
    >
      {text}
    </StyledButton>
  </a>
);

Button.propTypes = {
  outline: PropTypes.bool,
  text: PropTypes.string,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  size: PropTypes.string,
  border: PropTypes.number,
  disabled: PropTypes.bool,
  round: PropTypes.bool,
  href: PropTypes.string,
};

Button.defaultProps = {
  outline: false,
  text: 'Click me',
  color: colors.darkGrey,
  hoverColor: colors.darkGrey,
  activeColor: colors.darkerGrey,
  size: fonts.size.medium,
  border: borders.width.moderate,
  disabled: false,
  round: false,
  href: '#',
};

export default Button;
