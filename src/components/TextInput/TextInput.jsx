import React from 'react';
import PropTypes from 'prop-types';

// components
import { Form, Message } from 'semantic-ui-react';

// styles
import './TextInput.css';

const TextInput = props => (
  <div className="textInputContainer">
    <Form.Input
      type={props.type}
      label={props.label}
      placeholder={props.placeholder}
      onChange={e => props.onChange(e)}
    />

    {/* display an error message below the input field if there is an error */}
    {props.hasError ?
      <Message
        error
        header={props.errorHeader}
        content={props.errorMessage}
      /> : null
    }
  </div>
);

TextInput.defaultProps = {
  label: '',
  type: 'text',
  hasError: false,
  placeholder: '',
  errorHeader: 'Error',
  errorMessage: 'Invalid input provided',
  onChange: () => null,
};

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  hasError: PropTypes.bool,
  errorHeader: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

export default TextInput;
