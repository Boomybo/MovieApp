import React from 'react';
import { Alert } from 'antd';

import icon from './image-204707.svg';
import './ErrorComponent.scss';

const ErrorComponent = () => {
  return (
    <div className="err main__err">
      <img src={icon} className="sad-cat err__sad-cat"></img>
      <Alert message="Oops, something get wrong, please reload the page" type="error" />
    </div>
  );
};

export default ErrorComponent;
