import React from 'react';
import { Spin } from 'antd';
import './Spin.css';

export default class MySpin extends React.Component {
  render() {
    let classNaming;

    if (this.props.className === 'image-spin') {
      classNaming = 'image-spin';
    } else {
      classNaming = 'big-spin main__big-spin';
    }

    return (
      <div className={classNaming}>
        <Spin size="large" />
      </div>
    );
  }
}
