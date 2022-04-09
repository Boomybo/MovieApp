import React from "react";
import { Alert } from "antd";
import icon from "./Bongo-Cat-png-3.png"
import MySpin from "../Spin/Spin";
import MyError from "../ErrorComponent/MyError";

export default class FirstPage extends React.Component {

    render() {

        const {error, loading} = this.props

        const hasData = !(error || loading)

        const classNaming = "big-spin"

        const errMessage = error ? <MyError/> : null;
        const load = loading ? <MySpin className={classNaming}/> : null
        const content = hasData ? <MyFirstPage/> : null

        return (
            <div className="first-page">
                <MyFirstPage/>
                {/* {errMessage}
                {load}
                {content} */}
            </div>
        )
    }
}



const MyFirstPage = () => {
    return (
        <>
            <img src={icon} className="first-page__img"></img>
                <p className="first-page__text">Welcome to MovieApp!</p>
                <p className="first-page__text">Start using by entering the name of the movie</p>
        </>
    )
}