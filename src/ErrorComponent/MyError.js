import React from "react";
import { Alert } from "antd";
import icon from "./image-204707.svg"

const MyError = () => {
    return (
        <div className="err">
            <img src={icon} className="sad-cat"></img>
            <Alert message="Oops, something get wrong, please reload the page" type="error" />
        </div>
    )
}

export default MyError