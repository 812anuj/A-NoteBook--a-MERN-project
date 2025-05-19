import React from 'react';

function Alert({ alert }) {
  return (
    <div style={{ height: '50px' }}>
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;


