import React from 'react';

function Notify({ errorMessage }) {
  return (
    <div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
}

export default Notify;
