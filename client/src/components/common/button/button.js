import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, type, disabled }) => {
    return (
        <button className="button-custom" type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.node]),
    onClick: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    chidren: 'Go!',
    onClick: () => { },
    type: 'button',
    disabled: false
};

export default Button;
