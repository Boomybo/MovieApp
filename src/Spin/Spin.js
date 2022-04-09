import React from "react";
import { Spin } from "antd";
import "antd/dist/antd.css"

export default class MySpin extends React.Component {
    render() {

        let classNaming

        if(this.props.className === "image-spin") {
            classNaming = "image-spin"
        } else {
            classNaming = "big-spin"
        }

        return (
            <div className={classNaming}>
                <Spin size="large"/>
            </div>
        )
    }
}
