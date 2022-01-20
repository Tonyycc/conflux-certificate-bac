import styled from "styled-components";
import { color, space, layout, typography } from "styled-system";

const getOpacity = ({ $isLoading = false }) => {
  return $isLoading ? ".5" : "1";
};

const StyledButton = styled.button`
  align-items: center;
  border: 0;
  border-radius: 32px;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: ${getOpacity};
  padding: 8px 16px;
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
  &:hover:not(:disabled):not(.btn-disabled):not(.btn-disabled):not(:active) {
    opacity: 0.65;
  }
  &:active:not(:disabled):not(.btn-disabled):not(.btn-disabled) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }
  ${color}
  ${typography}
  ${layout}
  ${space}
`;

export default StyledButton;
