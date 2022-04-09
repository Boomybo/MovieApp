import React from "react";
import debounce from "lodash.debounce";
import { Alert } from "antd";
import { throttle } from "lodash";
import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";

export default class SearchInput  extends React.Component{

    state = {
        label: "",
    }

    onLabelChange = (e) => {
        const {getUrl} = this.props;
        this.setState({
            label: e.target.value
        }, ()=>{getUrl(this.state.label)});
        //this.props.getUrl(this.state.label)
    };

    // componentDidUpdate(prevProps, prevState) {
    //     const {label} = this.state
    //     if(prevState.label !== label) {
    //         this.props.getUrl(this.state.label)
    //     }
    // }


    render() {
        return (
            <form onSubmit={this.onSub}>
            <input type="text" 
            placeholder="Type to search..." 
            className="movie-input"
            onChange={this.onLabelChange}
            
            value={this.state.label}></input>
            </form>
            
        )
    }
}