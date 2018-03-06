import React from 'react';
import { string } from 'prop-types';
import { Icon } from 'watson-react-components';

function NoContent({ message, query }) {
  return (
    <div className="no-content--wrapper">
      <div className="no-content--icon">
        <Icon type="info" />
      </div>
      <div className="no-content--messages">
        <p className="no-content--set-message">
          { message }
        </p>
      </div>
    </div>
  );
}

NoContent.propTypes = {
  message: string.isRequired,
};

export default NoContent;
