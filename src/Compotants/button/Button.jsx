import React from "react";
import { Link } from "react-router-dom";

function Button({ buttonClassName, icon, text, action, linkTo, iconStyle }) {
  const getButtonContent = () => (
    <>
      {icon && <span className={iconStyle}>{icon}</span>}
      <p className="mb-0 mt-0">{text}</p>
    </>
  );

  const getButton = () => {
    if (linkTo) {
      return (
        <Link to={linkTo} className={buttonClassName}>
          {getButtonContent()}
        </Link>
      );
    } else {
      return (
        <button className={buttonClassName} onClick={action}>
          {getButtonContent()}
        </button>
      );
    }
  };

  return <>{getButton()}</>;
}

export default Button;
