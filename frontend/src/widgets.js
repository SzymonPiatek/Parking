import React from "react";

function Button({ children, className, onClick }) {
  return (
    <button
      className={className ? `button ${className}` : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
