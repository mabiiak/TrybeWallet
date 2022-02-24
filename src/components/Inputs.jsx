import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { type, dataTest, name, value, onChange, placeholder } = this.props;
    return (
      <label htmlFor={ name }>
        <input
          type={ type }
          id={ name }
          data-testid={ dataTest }
          name={ name }
          value={ value }
          placeholder={ placeholder }
          onChange={ onChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
