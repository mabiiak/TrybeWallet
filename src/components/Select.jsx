import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { dataTest, id, name, onChange, value, arrayOptions } = this.props;
    return (
      <label htmlFor={ id }>
        { id }
        <select
          data-testid={ dataTest }
          id={ id }
          name={ name }
          onChange={ onChange }
          value={ value }
        >
          {
            arrayOptions.map((option) => (
              <option key={ option }>{option}</option>
            ))
          }
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  dataTest: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  arrayOptions: PropTypes.arrayOf(Object).isRequired,
  id: PropTypes.string.isRequired,
};

export default Select;
