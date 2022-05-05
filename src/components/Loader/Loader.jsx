import React from 'react';
import { Spin } from 'antd';

import './Loader.scss';

const Loader = ({ className }) => {
  let classNaming;

  if (className === 'image-spin') {
    classNaming = 'image-spin';
  } else {
    classNaming = 'big-spin main__big-spin';
  }

  return (
    <div className={classNaming}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
