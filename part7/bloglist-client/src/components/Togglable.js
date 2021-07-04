import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const Togglable = React.forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : 'block' };
  const showWhenVisible = { display: visible ? 'block' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <Container>
      <div style={hideWhenVisible}>
        <Button
          style={{ margin: '2.5em 0' }}
          variant="outlined"
          onClick={toggleVisibility}
        >
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button
          style={{ margin: '2.5em 0' }}
          variant="outlined"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </Container>
  );
});

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
