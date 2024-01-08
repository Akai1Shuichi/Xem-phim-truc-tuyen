import React from 'react';
import './button.css';
const Button = ({ index, text, full, onClick }) => {
  if (index == 1) {
    return (
      <button
        className="primary-btn"
        style={{ width: full && '100%' }}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
};

export default Button;
