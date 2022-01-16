import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, type }) => {
    return (
        <button className="button-custom" type={type} onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string
};

Button.defaultProps = {
    text: 'Go!',
    onClick: () => {},
    type: 'button'
};

export default Button;
