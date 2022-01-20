import React, { isValidElement, cloneElement } from "react";
import StyledButton from "./StyledButton";

const Button = (props) => {
  const {
    startIcon,
    endIcon,
    className,
    isLoading,
    disabled,
    children,
    ...rest
  } = props;

  const classNames = className ? [className] : [];

  const isDisabled = isLoading || disabled;

  if (isLoading) {
    classNames.push("btn-loading");
  }

  if (isDisabled && !isLoading) {
    classNames.push("btn-disabled");
  }

  return (
    <StyledButton
      $isLoading={isLoading}
      className={classNames.join(" ")}
      disabled={isDisabled}
      {...rest}
    >
      <>
        {isValidElement(startIcon) &&
          cloneElement(startIcon, {
            mr: "0.5rem",
          })}
        {children}
        {isValidElement(endIcon) &&
          cloneElement(endIcon, {
            ml: "0.5rem",
          })}
      </>
    </StyledButton>
  );
};

Button.defaultProps = {
  isLoading: false,
  disabled: false,
};

export default Button;
