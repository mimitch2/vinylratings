import React from 'react';
import PropTypes from 'prop-types';
import './button.scss'

const Button = ({ children, onClick, type, disabled, className }) => {
    return (
        <button className={`button-custom ${className}`} type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.node]),
    onClick: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

Button.defaultProps = {
    chidren: 'Go!',
    onClick: () => { },
    type: 'button',
    disabled: false,
    className: ''
};

export default Button;
